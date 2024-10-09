import { Form } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React from "react";

import InputText from "@/components/Input";
import HiddenInput from "@/components/Input/HiddenInput";
import { REGISTER_FORM_KEY } from "@/constants/register-form";
import { Button } from "antd/lib";

const { Item } = Form;
export type TLoginForm = Partial<TPropsFormInput> & {
  isLoading: boolean;
};

const LoginForm: React.FC<TLoginForm> = ({
  control,
  errors,
  onSubmit,
  isLoading,
}) => {
  const [form] = Form.useForm();
  const size: SizeType = "large";

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 24, lg: 8 }}
      wrapperCol={{ span: 24, lg: 16 }}
      rootClassName="custom-antd-form-small"
      form={form}
    >
      <Item label={"Username"}>
        <InputText
          placeholder="abcxyz"
          placement="top"
          control={control}
          error={errors}
          name={REGISTER_FORM_KEY["userName"]}
          size={size}
        />
      </Item>
      <Item label={"Password"} required>
        <HiddenInput
          placeholder="******"
          placement="top"
          control={control}
          error={errors}
          name={REGISTER_FORM_KEY["password"]}
          size={size}
        />
      </Item>
      <Button
        onClick={onSubmit}
        htmlType="submit"
        onSubmit={onSubmit}
        size={size}
        type="primary"
        className="w-full text-body-2-semibold bg-blue-500"
        loading={isLoading}
      >
        {"Log In!"}
      </Button>
    </Form>
  );
};

export default LoginForm;
