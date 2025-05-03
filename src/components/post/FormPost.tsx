"use client";

import { FC } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { Post } from "@/types/post";
import { containsKorean } from "@/utils/formatter";
import { useParams } from "next/navigation";

interface FormPostProps {
  props?: Post;
}

const FormPost: FC<FormPostProps> = ({ props }) => {
  const { postSlug } = useParams();

  const initialValues: Post = {
    userId: props?.userId ?? 0,
    userName: props?.userName ?? "",
    userProfilePictureUrl: props?.userProfilePictureUrl ?? "",
    title: props?.title ?? "",
    body: props?.body ?? "",
    totalViews: props?.totalViews ?? 0,
    createdAt: props?.createdAt ?? "",
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

  const handleFormSubmit = () => {
    if (postSlug) {
      console.log("test edit");
    } else {
      console.log("test post");
    }
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
              <span className="text-2xl font-bold">Create New Post</span>
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
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default FormPost;
