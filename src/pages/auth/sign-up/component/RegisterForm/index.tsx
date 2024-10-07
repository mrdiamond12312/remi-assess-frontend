import { Form } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React from "react";

import InputText from "@/components/Input";
import HiddenInput from "@/components/Input/HiddenInput";
import { REGISTER_FORM_KEY } from "@/constants/register-form";
import { Button } from "antd/lib";

const { Item } = Form;
export type TRegisterForm = Partial<TPropsFormInput> & {
  isLoading: boolean;
};

const RegisterForm: React.FC<TRegisterForm> = ({
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
      <Item label={"Fullname"} required>
        <InputText
          placeholder="abcxyz"
          placement="top"
          control={control}
          error={errors}
          name={REGISTER_FORM_KEY["fullName"]}
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
      <Item label={"Password Confirmation"} required>
        <HiddenInput
          placeholder="******"
          placement="top"
          control={control}
          error={errors}
          name={REGISTER_FORM_KEY["passwordConfirm"]}
          size={size}
        />
      </Item>
      <Item label={"Your Email"} required>
        <InputText
          placeholder="x@mail-to.com"
          placement="top"
          control={control}
          error={errors}
          name={REGISTER_FORM_KEY["email"]}
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
        {"Sign Up"}
      </Button>
    </Form>
  );
};

export default RegisterForm;
