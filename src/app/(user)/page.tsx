import { FC } from "react";
import CardPost from "@/components/post/CardPost";
import { dateTimeFormatter } from "@/utils/formatter";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Home: FC = () => {
  return (
    <>
      <div
        className={
          "border-b-2 border-slate-200 flex justify-center gap-5 py-12"
        }
      >
        <p className={"text-2xl font-semibold text-gray-700"}>
          Write some ideas
        </p>
        <Link href={"/post/form/"}>
          <Button>New Post</Button>
        </Link>
      </div>
      <div>
        {Array.from({ length: 5 }, (_, index) => (
          <CardPost
            key={index}
            userId={1}
            userName={"Inggis Kurnia"}
            title={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
            body={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
            }
            createdAt={dateTimeFormatter("2025-05-01T07:14:11.490684Z")}
            totalViews={2}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
