import { FC } from "react";
import CreateBoard from "@/components/board/CreateBoard";
import CardBoard from "@/components/board/CardBoard";
import { dateTimeFormatter } from "@/utils/formatter";

const Home: FC = () => {
  return (
    <section className={"flex justify-center"}>
      <div
        className={
          "md:w-[45%] bg-slate-50  flex flex-col min-h-[calc(100vh-60px)]"
        }
      >
        <div className={"border-b-2 border-slate-200"}>
          <CreateBoard />
        </div>
        <div>
          {Array.from({ length: 5 }, (_, index) => (
            <CardBoard
              key={index}
              postId={1}
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
      </div>
    </section>
  );
};

export default Home;
