"use client";

import { FC } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { Post, PostForm } from "@/types/post";
import { containsKorean } from "@/utils/formatter";
import { useParams, useRouter } from "next/navigation";
import { createNewPost, updatePost } from "@/api/post/postPost";
import { toast } from "@/hooks/use-toast";

interface FormPostProps {
  props?: Post;
}

const FormPost: FC<FormPostProps> = ({ props }) => {
  const { postSlug } = useParams();
  const router = useRouter();

  const initialValues: PostForm = {
    title: props?.title ?? "",
    body: props?.body ?? "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Required")
      .test("title-length", "Title is too long", function (value) {
        if (!value) return true;

        if (containsKorean(value)) {
          return value.length <= 50;
        } else {
          return value.length <= 100;
        }
      }),
    body: Yup.string().min(10, "Minimum 10 characters").required("Required"),
  });

  const handleFormSubmit = (
    values: PostForm,
    { setSubmitting }: FormikHelpers<PostForm>,
  ) => {
    if (postSlug) {
      updatePost(String(postSlug), values)
        .then(() => {
          toast({
            title: "Update Post Success",
            duration: 5000,
          });
          router.push("/");
        })
        .catch(() => {
          toast({
            title: "Error updating post",
            duration: 5000,
            variant: "destructive",
          });
        })
        .finally(() => setSubmitting(false));
    } else {
      createNewPost(values)
        .then(() => {
          toast({
            title: "Create New Post Success",
            duration: 5000,
          });
          router.push("/");
        })
        .catch(() => {
          toast({
            title: "Failed to create new post",
            duration: 5000,
            variant: "destructive",
          });
        })
        .finally(() => setSubmitting(false));
    }
    setSubmitting(false);
  };

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-6  px-10 py-5">
            <div className={"border-b-2 border-b-slate-200 py-5"}>
              <span className="text-2xl font-bold">
                {postSlug ? "Edit Post" : "Create New Post"}
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className=" text-gray-700 font-semibold">
                Title
              </label>
              <p className={"text-sm text-gray-700"}>
                Write up to 50 characters in Korean, 100 characters in English
              </p>
              <Field
                name="title"
                type="text"
                className="h-10 w-full rounded-md border-2 px-3"
                placeholder="Title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="font-medium text-gray-700">
                Body
              </label>
              <p className={"text-sm text-gray-700"}>
                Write at least 10 character
              </p>
              <Field
                name="body"
                as="textarea"
                className="h-56 w-full rounded-md border-2 px-3"
                placeholder="Your content"
              />
              <ErrorMessage
                name="body"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className={"flex justify-end  items-center"}>
              <Button
                type="submit"
                className="mt-6 font-semibold w-32"
                disabled={isSubmitting}
              >
                {postSlug
                  ? isSubmitting
                    ? "Editing..."
                    : "Edit"
                  : isSubmitting
                    ? "Posting..."
                    : "Post"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default FormPost;
