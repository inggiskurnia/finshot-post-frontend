"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { toast } from "@/hooks/use-toast";
import { RegisterUser } from "@/types/user";
import { registerUser } from "@/api/user";

const Register: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const initialValues: RegisterUser = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8, "Minimum 8 characters").required("Required"),
  });

  const handleFormSubmit = (
    values: RegisterUser,
    { setSubmitting }: FormikHelpers<RegisterUser>,
  ) => {
    registerUser(values)
      .then(() => {
        toast({
          title: "Register Success !",
          duration: 5000,
        });
        router.push("/login");
      })
      .catch(() => {
        toast({
          title: "Register error",
          description: "Please try again",
          variant: "destructive",
          duration: 5000,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <section className="grid grid-cols-2 h-screen">
      <div className={"h-screen bg-purple-postit"}>
        <Image
          src="/images/login-image.jpg"
          alt="login-page"
          height={1080}
          width={1980}
          className="object-contain w-full h-full"
        />
      </div>

      <div className="flex items-center justify-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-[50%] space-y-6">
              <div className="flex flex-col mb-6 gap-2">
                <span className="text-4xl font-bold">Register New User</span>
                <span className="text-gray-700 text-lg">
                  Please fill your data
                </span>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="font-medium text-gray-700">
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="h-10 w-full rounded-md border-2 px-3"
                  placeholder="Your Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="font-medium text-gray-700">
                  Email address
                </label>
                <Field
                  name="email"
                  type="email"
                  className="h-10 w-full rounded-md border-2 px-3"
                  placeholder="yourmail@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="h-10 w-full rounded-md border-2 px-3 pr-10"
                    placeholder="your password"
                  />
                  <div
                    className="absolute right-3 top-2.5 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-6 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>

              <div className={"flex justify-center"}>
                <span className={"text-gray-700"}>
                  Already have an account ?{" "}
                  <Link href={"/login"}>
                    <span className={"cursor-pointer font-bold"}>Login</span>
                  </Link>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Register;
