import { FC } from "react";
import { Button } from "@/components/ui/button";

const CreateBoard: FC = () => {
  return (
    <section className={"flex justify-center gap-5 py-12"}>
      <p className={"text-2xl font-semibold text-gray-700"}>
        Write some ideas !
      </p>
      <Button>New Board</Button>
    </section>
  );
};

export default CreateBoard;
