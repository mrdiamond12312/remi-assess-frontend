import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { REGISTER_FORM_KEY } from "@/constants/register-form";

const useRegisterResolver = () => {
  const RegisterValidationSchema = yup.object().shape({
    [REGISTER_FORM_KEY.userName]: yup
      .string()
      .required("Please input your username!"),
    [REGISTER_FORM_KEY.fullName]: yup
      .string()
      .required("Please input your fullname!"),
    [REGISTER_FORM_KEY.password]: yup
      .string()
      .required("Please input your password"),
    [REGISTER_FORM_KEY.passwordConfirm]: yup
      .string()
      .oneOf(
        [yup.ref(REGISTER_FORM_KEY.password), undefined],
        "Password not matched!"
      )
      .required("Please confirm your password"),
    [REGISTER_FORM_KEY.email]: yup
      .string()
      .email("Not a valid email!")
      .required("Please input your email"),
  });

  return {
    FormSchema: yupResolver(RegisterValidationSchema),
  };
};

export default useRegisterResolver;
