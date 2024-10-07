import { lazyRouteImport } from "@/utils/lazyRouteImport";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectAuthRoute from "@/wrappers/ProtectAuthRoute";

export const router = createBrowserRouter([
  {
    path: "",
    lazy: () => lazyRouteImport("layouts/Navbar"),

    children: [
      // {
      //   path: path.HOMEPAGE,
      //   element: <Navigate replace to={(path)} />,
      // },
      {
        index: true,
        path: "",
        element: <Navigate to="videos-feed" replace />,
      },
      {
        index: true,
        path: "videos-feed",
        lazy: () => lazyRouteImport("pages/videos"),
      },
      {
        path: "auth",
        element: <ProtectAuthRoute />,
        children: [
          {
            path: "login",
            lazy: () => lazyRouteImport("pages/auth/login"),
          },
          {
            path: "sign-up",
            lazy: () => lazyRouteImport("pages/auth/sign-up"),
          },
        ],
      },
    ],
  },

  {
    path: "*",
    lazy: () => lazyRouteImport("pages/NotFound"),
  },
]);
