"use client";

import { FC, useState } from "react";
import CardPost from "@/components/post/CardPost";
import { dateTimeFormatter } from "@/utils/formatter";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedAllPost } from "@/api/post/getPosts";
import Pagination from "@/components/common/Pagination";

const Home: FC = () => {
  const [page, setPage] = useState<number>(0);

  const { data } = useQuery({
    queryKey: ["paginated-posts", page],
    queryFn: () => getPaginatedAllPost({ page, limit: 10 }),
  });

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
      <div className={"flex flex-col"}>
        {data?.data.content.map((post) => (
          <CardPost
            key={post.postId}
            postId={post.postId}
            author={post.author}
            title={post.title}
            body={post.body}
            createdAt={dateTimeFormatter(post.createdAt)}
            totalViews={post.totalViews}
          />
        ))}
      </div>
      <div className={"pb-10"}>
        {data?.data && (
          <Pagination
            currentPage={data?.data.currentPage}
            totalPages={data?.data.totalPages}
            onPageChange={setPage}
            hasNext={data?.data.hasNext}
            hasPrev={data?.data.hasPrev}
          />
        )}
      </div>
    </>
  );
};

export default Home;
