import { AuthContext } from "@/wrappers/Auth/Auth";
import { useContext } from "react";

export const useAuthContext = () => {
  const userContext = useContext(AuthContext);

  if (!userContext) {
    throw new Error("Please use AuthContext within its Provider");
  }
  
  return userContext;
};
