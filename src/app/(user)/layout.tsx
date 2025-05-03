import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={"min-h-svh flex flex-col bg-slate-100"}>
      <Navbar />
      <div>{children}</div>
      <Toaster />
    </main>
  );
};

export default Layout;
