"use client";

import { FC, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "@/api/post/getPosts";
import { dateTimeFormatter } from "@/utils/formatter";

const PostPage: FC = () => {
  const { postSlug } = useParams();

  const { data } = useQuery({
    queryKey: ["post-slug"],
    queryFn: () => getPostBySlug(String(postSlug)),
  });

  useEffect(() => {}, []);

  return (
    <section className="flex flex-col gap-6  px-10 py-5">
      {data?.data && (
        <>
          <div className={"border-b-2 border-b-slate-200 py-5"}>
            <span className="text-2xl font-bold">{data?.data.title}</span>
          </div>
          <div
            className={
              "flex flex-col border-b-2 border-b-slate-200 pb-5 text-gray-700"
            }
          >
            <p> Author : {data?.data.author}</p>
            <p>Publish at : {dateTimeFormatter(data?.data.createdAt)}</p>
            <p>Total views : {data?.data.totalViews}</p>
          </div>
          <div>
            <p>{data?.data.body}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default PostPage;
