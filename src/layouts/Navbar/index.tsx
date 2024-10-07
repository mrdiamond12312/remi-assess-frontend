import * as path from "@/constants/path";
import { Link, Navigate, Outlet, redirect } from "react-router-dom";

import React from "react";
import UserInfo from "@/components/UserInfo";

const NavBar: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <nav className="px-12 bg-white h-20 flex flex-row  justify-center sticky top-0 left-0 z-10">
        <div className="max-w-7xl w-full h-20 flex flex-row justify-between items-center border-b">
          <Link to={path.HOMEPAGE} className="text-heading-4">
            Funny Movies
          </Link>
          <UserInfo />
        </div>
      </nav>
      <div className="min-h-[calc(100vh-160px)] h-fit max-w-7xl w-11/12 mx-auto my-4">
        <Outlet />
      </div>
      <div className="px-12 bg-neutral-3 h-12 w-full text-white flex flex-row items-center justify-center">
        <span className="text-heading-5">FOOTER</span>
      </div>
    </div>
  );
};

export default NavBar;
