import { HOMEPAGE } from "@/constants/path";
import { useAuthContext } from "@/wrappers/Auth/useAuthContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectAuthRoute: React.FC = () => {
  const { data } = useAuthContext();

  if (data) {
    return <Navigate to={HOMEPAGE} replace />
  }

  return <Outlet />;
};

export default ProtectAuthRoute;
