import * as path from "@/constants/path";
import { Link, Outlet } from "react-router-dom";

import React, { Suspense } from "react";
import UserInfo from "@/components/UserInfo";
import Loading from "@/components/LoadingSprite";

const NavBar: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <nav className="bg-white h-20 flex flex-row  justify-center sticky top-0 left-0 z-10">
        <div className="px-4 max-w-7xl w-full h-20 flex flex-row justify-between items-center border-b">
          <Link to={path.HOMEPAGE} className="text-heading-4 hidden md:flex">
            Funny Movies
          </Link>
          <div className="ml-auto">
            <UserInfo />
          </div>
        </div>
      </nav>
      <div className="min-h-[calc(100vh-112px)] h-fit max-w-7xl w-11/12 mx-auto my-4 relative">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
      {/* <div className="px-12 bg-neutral-3 h-12 w-full text-white flex flex-row items-center justify-center">
        <span className="text-heading-5">FOOTER</span>
      </div> */}
    </div>
  );
};

export default NavBar;
