"use client";

import { FC, useEffect } from "react";
import { deslugify } from "@/utils/formatter";
import { useParams } from "next/navigation";

const PostPage: FC = () => {
  const { postSlug } = useParams();

  useEffect(() => {
    if (postSlug != null) {
      const title = deslugify(String(postSlug));
    }
  });

  return (
    <section>
      <div>Post</div>
    </section>
  );
};

export default PostPage;
