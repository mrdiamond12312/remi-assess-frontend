import { notification } from "antd";
import { useForm } from "react-hook-form";

import { HOMEPAGE } from "@/constants/path";
import { useServiceLogin } from "@/services/auth/services";
import { useLocation } from "react-router-dom";
import { LOGIN_FORM_KEY } from "@/constants/login-form";
import useLoginResolver from "@/pages/auth/login/hooks/useLoginResolver";

export type TLoginFormFields = {
  [LOGIN_FORM_KEY.userName]: string;
  [LOGIN_FORM_KEY.password]: string;
};

export const useLoginForm = () => {
  const { FormSchema } = useLoginResolver();
  const {
    control,
    formState: { errors, dirtyFields, isValid, isDirty },
    getValues,
    trigger,
    handleSubmit,
  } = useForm<TLoginFormFields>({
    defaultValues: {},
    resolver: FormSchema ?? null,
    mode: "onTouched",
  });

  const { mutate, isPending } = useServiceLogin();

  const location = useLocation();
  const state = location.state as ILinkPreviousRoute;

  const onSubmit = (body: TLoginFormFields) => {
    mutate(body, {
      onSuccess: async () => {
        notification.success({
          message: "Log in Successfully!",
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
        } else if (error.statusCode === 401)
          notification.error({
            message: "Wrong Credentials",
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
