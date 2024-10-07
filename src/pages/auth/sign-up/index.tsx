import RegisterForm from "@/pages/auth/sign-up/component/RegisterForm";
import { useRegisterForm } from "@/pages/auth/sign-up/hooks/useRegisterForm";
import { Col, Row } from "antd";
import React from "react";
import { Helmet } from "react-helmet";

const SignUp: React.FC = () => {
  const { control, errors, handleSubmit, onSubmit, isPending } =
    useRegisterForm();

  return (
    <section className="w-full max-w-7xl flex m-auto py-8">
      <Helmet>
        <title>Sign Up | Test Assessment</title>
      </Helmet>
      <article className="w-full h-full bg-neutral-1 py-12 rounded-lg">
        <Row gutter={12}>
          <Col
            span={24}
            lg={12}
            className="flex flex-col justify-center items-center "
          >
            <h1 className="text-heading-1 font-sans px-4">{"Sign Up"}</h1>
            <p className="text-heading-5 font-sans px-4 text-center whitespace-pre">
              {"Newcomer? Let's Sign up!"}
            </p>
          </Col>
          <Col
            span={24}
            lg={12}
            className="flex flex-col justify-center items-center !px-12"
          >
            <RegisterForm
              control={control}
              error={errors}
              onSubmit={handleSubmit(onSubmit)}
              isLoading={isPending}
            />
          </Col>
        </Row>
      </article>
    </section>
  );
};
export default SignUp;
