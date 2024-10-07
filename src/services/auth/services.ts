import API_ENDPOINTS from "@/services/auth/api-path";
import {
  getCurrentAuthInfo,
  login,
  register,
} from "@/services/auth/api-services";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "@/utils/local-storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TRegisterFormFields } from "@/pages/auth/sign-up/hooks/useRegisterForm";
import { TLoginFormFields } from "@/pages/auth/login/hooks/useLoginForm";

export const useServiceLogin = () => {
  return useMutation<API.TAuthResponse, TMeta, TLoginFormFields>({
    mutationKey: [API_ENDPOINTS.LOGIN],
    mutationFn: (body: TLoginFormFields) => login(body),
    onSuccess: (loginResult: API.TAuthResponse) => {
      setStorageItem("accessToken", loginResult?.accessToken);
    },
  });
};

export const useServiceRegister = () => {
  return useMutation<API.TAuthResponse, TMeta, TRegisterFormFields>({
    mutationKey: [API_ENDPOINTS.REGISTER],
    mutationFn: (body: TRegisterFormFields) => register(body),
    onSuccess: (authResult: API.TAuthResponse) => {
      const { accessToken } = authResult;
      setStorageItem("accessToken", accessToken);
    },
  });
};

export const handleLogout = () => {
  removeStorageItem("accessToken");
};

export const fetchAuthInfo = async (): Promise<
  API.TAuthProfile | undefined
> => {
  if (getStorageItem("accessToken", undefined) === undefined) return undefined;
  try {
    const userData = await getCurrentAuthInfo();
    return userData;
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

export const useAuthInfo = () => {
  return useQuery<API.TAuthProfile | undefined>({
    queryKey: [API_ENDPOINTS.PROFILE],
    queryFn: () => getCurrentAuthInfo(),
    enabled: getStorageItem("accessToken") !== undefined,
  });
};
