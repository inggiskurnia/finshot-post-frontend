"use client";

import { FC } from "react";
import { LogIn, LogOut } from "lucide-react";
import AvatarComponent from "@/components/common/AvatarComponent";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { logoutUser } from "@/api/auth/postAuth";
import { toast } from "@/hooks/use-toast";

const Navbar: FC = () => {
  const session = useSession();

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast({
          title: "Logout successful",
          duration: 5000,
        });
        signOut({ callbackUrl: "/login" });
      })
      .catch(() => {
        toast({
          title: "Logout failed",
          variant: "destructive",
          duration: 5000,
        });
      });
  };

  return (
    <nav
      className={
        "sticky top-0 z-[20] flex justify-between bg-gradient-to-r from-purple-postit  to-white text-white  md:px-40 px-10 py-4"
      }
    >
      <Link href={"/"}>
        <div className={"flex gap-4 items-center"}>
          <AvatarComponent author={"Inggis Kurnia Trisiawan"} />

          <p className={"font-semibold md:block hidden"}>
            Welcome, Inggis Kurnia Trisiawan !
          </p>
        </div>
      </Link>

      <div>
        {!session.data ? (
          <Link href={"/login"}>
            <button
              className={
                "cursor-pointer font-semibold rounded-md flex items-center gap-2 text-gray-700"
              }
            >
              <LogIn size={18} /> Login
            </button>
          </Link>
        ) : (
          <button
            className={
              "cursor-pointer font-semibold rounded-md flex items-center gap-2 text-gray-700"
            }
            onClick={handleLogout}
          >
            Logout <LogOut size={"18"} />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
