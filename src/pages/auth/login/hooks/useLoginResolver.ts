import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { LOGIN_FORM_KEY } from "@/constants/login-form";

const useLoginResolver = () => {
  const LoginValidationSchema = yup.object().shape({
    [LOGIN_FORM_KEY.userName]: yup
      .string()
      .required("Please input your username!"),
    [LOGIN_FORM_KEY.password]: yup
      .string()
      .required("Please input your password"),
  });

  return {
    FormSchema: yupResolver(LoginValidationSchema),
  };
};

export default useLoginResolver;
