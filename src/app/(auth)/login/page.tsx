"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8, "Minimum 8 characters").required("Required"),
  });

  const handleFormSubmit = (
    values: LoginForm,
    { setSubmitting }: FormikHelpers<LoginForm>,
  ) => {
    signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    })
      .then(() => {
        toast({
          title: "Login Success !",
          duration: 5000,
        });

        router.push("/");
      })
      .catch(() => {
        toast({
          title: "Login error",
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
                <span className="text-4xl font-bold">Welcome back !</span>
                <span className="text-gray-700 text-lg">
                  Please enter your credentials
                </span>
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
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <div className={"flex justify-center"}>
                <span className={"text-gray-700"}>
                  Don&#39;t have an account ?{" "}
                  <Link href={"/register"}>
                    <span className={"cursor-pointer font-bold"}>Register</span>
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

export default LoginPage;
