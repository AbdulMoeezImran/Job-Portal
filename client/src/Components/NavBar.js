import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function NavBar() {
  const Router = useRouter();
  const userInfo = useSelector(state => state.user.userInfo);
  const [openJobs, setOpenJobs] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    Router.reload();
  };

  return (
    <>
      <div className="w-full px-6 h-20 bg-indigo-600 text-white flex items-center justify-between fixed top-0 left-0 z-[1000]">
        <div className="px-2 h-full flex items-center justify-center">
          <p className="uppercase font-semibold tracking-widest text-lg">
            JOB-PORTAL
          </p>
        </div>

        <div className="px-2 h-full hidden items-center justify-center lg:flex">
          <Link
            href={"/"}
            className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
          >
            Home
          </Link>
          <Link
            href={userInfo ? "/postajob" : "/auth/login"}
            className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
          >
            Post Jobs
          </Link>
          <Link
            href={userInfo ? "/postedjobs" : "/auth/login"}
            className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
          >
            Posted Jobs
          </Link>
          <Link
            href={userInfo ? "/dashboard" : "/auth/login"}
            className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
          >
            Dashboard
          </Link>
        </div>

        <div className="px-2 h-full hidden items-center justify-center lg:flex ">
          {userInfo !== null ? (
            <>
              <BiLogOut
                onClick={handleLogout}
                className=" cursor-pointer text-3xl hover:text-red-500 transition-all duration-700"
              />
              <p className="text-lg px-4 font-semibold">{userInfo.name}</p>
            </>
          ) : (
            <>
              <Link
                href={"/auth/login"}
                className="px-4 py-2 border border-white rounded uppercase tracking-widest mx-4   transition-all duration-700 hover:bg-white font-semibold text-base hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                href={"/auth/register"}
                className="px-4 py-2 border border-white rounded uppercase tracking-widest mx-4   text-indigo-600 bg-white transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-white"
              >
                REGISTER
              </Link>
            </>
          )}
        </div>

        <div className="flex lg:hidden  px-2 py-2 ">
          <GiHamburgerMenu
            className="text-4xl"
            onClick={() => setIsOpen(state => !state)}
          />
        </div>

        {isOpen && (
          <div className="flex absolute w-full lg:hidden py-2 bg-indigo-600 transition-all fade duration-1000 top-20 left-0 items-center justify-center flex-col ">
            <div className="px-2 h-full flex items-center justify-center flex-col py-2 ">
              <Link
                href={"/"}
                onClick={() => setIsOpen(false)}
                className="px-3  m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
              >
                Home
              </Link>
              <Link
                href={userInfo ? "/postajob" : "/auth/login"}
                onClick={() => setIsOpen(false)}
                className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
              >
                Post Jobs
              </Link>
              <Link
                href={userInfo ? "/postedjobs" : "/auth/login"}
                onClick={() => setIsOpen(false)}
                className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
              >
                Posted Jobs
              </Link>
              <Link
                href={userInfo ? "/dashboard" : "/auth/login"}
                onClick={() => setIsOpen(false)}
                className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase"
              >
                Dashboard
              </Link>
            </div>

            <div className="px-2 h-full  items-center justify-center flex">
              {userInfo !== null ? (
                <>
                  <BiLogOut
                    onClick={handleLogout}
                    className=" cursor-pointer text-3xl hover:text-red-500 transition-all duration-700"
                  />
                  <p className="text-lg px-4 font-semibold">{userInfo.name}</p>
                </>
              ) : (
                <>
                  <Link
                    href={"/auth/login"}
                    className="px-4 py-2 border border-white rounded uppercase tracking-widest mx-4   transition-all duration-700 hover:bg-white font-semibold text-base hover:text-indigo-600"
                  >
                    Login
                  </Link>
                  <Link
                    href={"/auth/register"}
                    className="px-4 py-2 border border-white rounded uppercase tracking-widest mx-4   text-indigo-600 bg-white transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-white"
                  >
                    REGISTER
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className="absolute inset-0 z-[900]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
