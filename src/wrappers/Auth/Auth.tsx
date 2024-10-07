import { useAuthInfo } from "@/services/auth/services";
import React from "react";
import { removeStorageItem } from "@/utils/local-storage";
import * as path from "@/constants/path";
import history from "@/services/history/history";

export interface IUserQuery {
  data: API.TAuthProfile | undefined;
  isLoading: boolean;
  error: Error | null;
  handleUserLogout: () => void;
}

export interface IAuthProvidersProps {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<IUserQuery | undefined>(
  undefined
);

export const AuthProvider: React.FC<IAuthProvidersProps> = ({ children }) => {
  const { data, isLoading, error, refetch } = useAuthInfo();

  const handleUserLogout = () => {
    removeStorageItem("accessToken");

    refetch();
    console.log(data);
    if (window.location.pathname !== path.LOGIN) {
      history.replace(
        {
          pathname: path.LOGIN,
        },
        { from: history.location.pathname }
      );
    } else history.push(path.LOGIN);
  };
  return (
    <AuthContext.Provider value={{ data, isLoading, error, handleUserLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
