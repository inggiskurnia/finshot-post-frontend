import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={"min-h-svh flex flex-col bg-slate-100"}>
      <Navbar />
      <div className={"flex justify-center"}>
        <div
          className={
            "md:w-[45%] bg-slate-50 flex flex-col min-h-[calc(100vh-60px)]"
          }
        >
          {children}
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
