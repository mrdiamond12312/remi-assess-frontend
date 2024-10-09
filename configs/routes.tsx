import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectAuthRoute from "@/wrappers/ProtectAuthRoute";
import React, { Suspense } from "react";
import NavBar from "@/layouts/Navbar/index";
import Loading from "@/components/LoadingSprite";

const LogIn = React.lazy(() => import("@/pages/auth/login"));
const SignUp = React.lazy(() => import("@/pages/auth/sign-up"));

const VideosFeed = React.lazy(() => import("@/pages/videos"));
const ShareVideoModal = React.lazy(() => import("@/pages/share-video"));

const NotFound = React.lazy(() => import("@/pages/NotFound"));

export const router = createBrowserRouter([
  {
    path: "",
    element: <NavBar />,

    children: [
      {
        index: true,
        path: "",
        element: <Navigate to="videos-feed" replace />,
      },
      {
        path: "videos-feed",
        element: <VideosFeed />,
        children: [
          {
            path: "share",
            element: (
              <Suspense fallback={<Loading />}>
                <ShareVideoModal />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "auth",
        element: <ProtectAuthRoute />,
        children: [
          {
            path: "login",
            element: <LogIn />,
          },
          {
            path: "sign-up",
            element: <SignUp />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
