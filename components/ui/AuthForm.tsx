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
import { Loader2, Loader2Icon } from "lucide-react";
import SignUp from "@/app/(auth)/sign-up/page";
import SignIn from "@/app/(auth)/sign-in/page";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // console.log(values);
      // setIsLoading(false);
      // SIGN UP WITH APPWRITE AND CREATE PLAIN LINK

      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.DOB!,
          ssn: data.SSN!,
          email: data.email,
          password: data.password
        };

        const newUser = await signUp(userData);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password
        });
        if (response) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    {" "}
                    <CustomInput
                      control={form.control}
                      label="First name"
                      name="firstName"
                      type="text"
                      placeholder="Enter last name"
                    />
                    <CustomInput
                      control={form.control}
                      label="Last name"
                      name="lastName"
                      type="text"
                      placeholder="Enter last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    label="Address"
                    name="address1"
                    type="text"
                    placeholder="Enter your specific address"
                  />
                  <CustomInput
                    control={form.control}
                    label="City"
                    name="city"
                    type="text"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    {" "}
                    <CustomInput
                      control={form.control}
                      label="State"
                      name="state"
                      type="text"
                      placeholder="Example: NY"
                    />
                    <CustomInput
                      control={form.control}
                      label="Postal Code"
                      name="postalCode"
                      type="text"
                      placeholder="Example: 11101"
                    />
                  </div>
                  <div className="flex gap-4">
                    {" "}
                    <CustomInput
                      control={form.control}
                      label="Date of Birth"
                      name="DOB"
                      type="text"
                      placeholder="yyyy-mm-dd"
                    />
                    <CustomInput
                      control={form.control}
                      label="SSN"
                      name="SSN"
                      type="text"
                      placeholder="Example: 1234"
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your email address"
              />
              <div className="flex flex-col gap-4">
                {" "}
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>

            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </div>
  );
};

export default AuthForm;
