import Sidebar from "@/components/ui/Sidebar";
import { Children } from "react";
import Image from "next/image";
import MobileNav from "@/components/ui/MobileNav";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {
    firstName: "Evelyn",
    lastName: "Adams"
  };
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="Logo" />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
