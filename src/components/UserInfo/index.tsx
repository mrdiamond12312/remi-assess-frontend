import { Button, Flex, notification, Spin, Typography } from "antd/lib";
import React from "react";
import { handleLogout } from "@/services/auth/services";
import { Link } from "react-router-dom";
import * as path from "@/constants/path";
import { useAuthContext } from "@/wrappers/Auth/useAuthContext";

const UserInfo: React.FC = () => {
  const userContext = useAuthContext();

  if (userContext) {
    if (userContext.isLoading) {
      return <Spin></Spin>;
    }

    if (userContext.data) {
      return (
        <Flex className="flex-row gap-4 items-center justify-center">
          <Typography className="text-body-2-regular">
            Welcome, {userContext.data.fullName}!
          </Typography>
          <Button
            onClick={() => {
              handleLogout();
              notification.success({
                message: "Logged Out Successfully!",
                duration: 0.5,
                onClose: () => {
                  window.location.reload();
                },
              });
            }}
            size="large"
            className="text-body-2-medium bg-blue-500"
            type="primary"
          >
            Log out!
          </Button>
        </Flex>
      );
    }
  }
  return (
    <Flex className="flex-row gap-2">
      <Link to={path.LOGIN}>
        <Button
          className="text-body-2-medium bg-blue-500"
          size="large"
          type="primary"
        >
          Log In
        </Button>
      </Link>
      <Link to={path.SIGN_UP}>
        <Button className="text-body-2-medium" size="large">
          Sign Up
        </Button>
      </Link>
    </Flex>
  );
};

export default UserInfo;
