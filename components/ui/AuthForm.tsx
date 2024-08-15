"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setuser] = useState(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof authFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex mb-12 cursor-pointer items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="StarStone logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black">
            StarStone
          </h1>
        </Link>

        <div className="fle flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link account" : type === "sign-in" ? "Sign In" : "Sign Up"}

            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your accout to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PLAIDLINK */}</div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomInput
              control={form.control}
              name="email"
              placeholder="Enter your email"
            />
            <CustomInput
              control={form.control}
              name="password"
              placeholder="Enter your email address"
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AuthForm;