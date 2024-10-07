import { lazyRouteImport } from "@/utils/lazyRouteImport";
import { createBrowserRouter } from "react-router-dom";
import * as path from "@/constants/path";

export const router = createBrowserRouter([
  {
    path: path.HOMEPAGE,
    lazy: () => lazyRouteImport("layouts/Navbar"),
    children: [
      // {
      //   path: path.HOMEPAGE,
      //   element: <Navigate replace to={(path)} />,
      // },
      {
        path: path.LOGIN,
        lazy: () => lazyRouteImport("pages/auth/login"),
      },
      {
        path: path.SIGN_UP,
        lazy: () => lazyRouteImport("pages/auth/sign-up"),
      },
    ],
  },

  {
    path: "*",
    lazy: () => lazyRouteImport("pages/NotFound"),
  },
  {
    path: path.PAGE_NOT_FOUND,
    lazy: () => lazyRouteImport("pages/NotFound"),
  },
]);
