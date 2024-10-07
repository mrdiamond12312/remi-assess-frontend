import { notification } from "antd";
import { useForm } from "react-hook-form";

import { HOMEPAGE } from "@/constants/path";
import { REGISTER_FORM_KEY } from "@/constants/register-form";
import useRegisterResolver from "@/pages/auth/sign-up/hooks/useRegisterResolver";
import { useServiceRegister } from "@/services/auth/services";
import { useLocation } from "react-router-dom";

export type TRegisterFormFields = {
  [REGISTER_FORM_KEY.userName]: string;
  [REGISTER_FORM_KEY.password]: string;
  [REGISTER_FORM_KEY.passwordConfirm]: string;
  [REGISTER_FORM_KEY.fullName]: string;
  [REGISTER_FORM_KEY.email]: string;
};

export const useRegisterForm = () => {
  const { FormSchema } = useRegisterResolver();
  const {
    control,
    formState: { errors, dirtyFields, isValid, isDirty },
    getValues,
    trigger,
    handleSubmit,
  } = useForm<TRegisterFormFields>({
    defaultValues: {},
    resolver: FormSchema ?? null,
    mode: "onTouched",
  });

  const { mutate, isPending } = useServiceRegister();

  const location = useLocation();
  const state = location.state as ILinkPreviousRoute;

  const onSubmit = (body: TRegisterFormFields) => {
    mutate(body, {
      onSuccess: async () => {
        notification.success({
          message: "Register Successfully!",
          duration: 0.5,
          onClose: () => {
            window.location.href = state?.from ?? HOMEPAGE;
          },
        });
      },

      onError: (error) => {
        if (error.statusCode === 503) {
          notification.error({
            message: "Server down",
          });
        } else if (error.statusCode === 400)
          notification.error({
            message: "Credentials Existed!",
          });
      },
    });
  };

  return {
    control,
    errors,
    dirtyFields,
    isValid,
    isDirty,
    getValues,
    trigger,
    handleSubmit,
    onSubmit,
    isPending,
  };
};
