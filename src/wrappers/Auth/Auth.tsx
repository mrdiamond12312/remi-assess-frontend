import { useAuthInfo } from "@/services/auth/services";
import React from "react";
import { removeStorageItem } from "@/utils/local-storage";
import * as path from "@/constants/path";
import history from "@/services/history/history";

export interface IUserQuery {
  data: API.TAuthProfile | undefined;
  isLoading: boolean;
  error: Error | null;
}

export interface IAuthProvidersProps {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<IUserQuery | undefined>(
  undefined
);

export const AuthProvider: React.FC<IAuthProvidersProps> = ({ children }) => {
  const { data, isLoading, error } = useAuthInfo();

  return (
    <AuthContext.Provider value={{ data, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
