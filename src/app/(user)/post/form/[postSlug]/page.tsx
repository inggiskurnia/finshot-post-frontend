"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "@/api/post/getPosts";
import { useParams } from "next/navigation";
import FormPost from "@/components/post/FormPost";

const EditPostFormPage: FC = () => {
  const { postSlug } = useParams();

  const { data } = useQuery({
    queryKey: ["post-slug", postSlug],
    queryFn: () => getPostBySlug(String(postSlug)),
  });

  return <>{data?.data && <FormPost props={data?.data} />}</>;
};

export default EditPostFormPage;
