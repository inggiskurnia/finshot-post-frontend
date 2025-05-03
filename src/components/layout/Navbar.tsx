import { FC } from "react";
import { LogOut } from "lucide-react";
import AvatarComponent from "@/components/common/AvatarComponent";

const Navbar: FC = () => {
  return (
    <nav
      className={
        "sticky top-0 z-[20] flex justify-between bg-gradient-to-r from-purple-postit  to-white text-white  md:px-40 px-10 py-4"
      }
    >
      <div className={"flex gap-4 items-center"}>
        <AvatarComponent userName={"Inggis Kurnia Trisiawan"} />

        <p className={"font-semibold md:block hidden"}>
          Welcome, Inggis Kurnia Trisiawan !
        </p>
      </div>
      <div>
        <button
          className={
            "cursor-pointer font-semibold rounded-md flex items-center gap-2 text-gray-700"
          }
        >
          Logout <LogOut size={"18"} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
