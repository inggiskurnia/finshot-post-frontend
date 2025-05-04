"use client";

import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "@/api/post/getPosts";
import { dateTimeFormatter } from "@/utils/formatter";
import { updateViews } from "@/api/post/putPosts";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { SquarePen, Trash } from "lucide-react";
import Link from "next/link";
import { deletePostBySlug } from "@/api/post/deletePosts";

const PostPage: FC = () => {
  const { postSlug } = useParams();
  const [updateViewsState, setUpdateViewsState] = useState(false);
  const session = useSession();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["post-slug", updateViewsState],
    queryFn: () => getPostBySlug(String(postSlug)),
  });

  useEffect(() => {
    if (postSlug) {
      setUpdateViewsState(true);
      updateViews(String(postSlug))
        .catch(() => {
          toast({
            title: "Error adding views",
            variant: "destructive",
            duration: 5000,
          });
        })
        .finally(() => {
          setUpdateViewsState(false);
        });
    }
    console.log(session);
  }, []);

  const handleDeletePost = () => {
    const confirmResult = confirm("Are you sure want to delete post ?");
    if (confirmResult) {
      deletePostBySlug(String(postSlug))
        .then(() => {
          toast({
            title: "Successfully delete post !",
            duration: 5000,
          });
          router.push("/");
        })
        .catch(() => {
          toast({
            title: "Error deleting post",
            variant: "destructive",
            duration: 5000,
          });
        });
    }
  };

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
          <div className={"flex gap-4"}>
            <Trash
              size={20}
              className={"text-red-500 cursor-pointer"}
              onClick={handleDeletePost}
            />
            <Link href={`/post/form/${postSlug}`}>
              <SquarePen
                size={20}
                className={"text-green-500 cursor-pointer"}
              />
            </Link>
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
