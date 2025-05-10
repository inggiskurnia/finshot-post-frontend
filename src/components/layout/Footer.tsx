import { FC } from "react";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={"bg-slate-100 h-20 flex justify-center items-center"}>
      <h1 className={"font-semibold"}>
        {currentYear} Postit. All rights reserved{" "}
      </h1>
    </footer>
  );
};

export default Footer;
