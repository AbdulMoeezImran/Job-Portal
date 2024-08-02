import Router from "next/router";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaUserAstronaut } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProfileTooltip = () => {
  const userInfo = useSelector(state => state.user.userInfo);
  const [isProfileTooltipOpen, setIsProfileTooltipOpen] = useState(false);

  return (
    <>
      <button
        className="relative flex items-center gap-3"
        onClick={() => setIsProfileTooltipOpen(!isProfileTooltipOpen)}
      >
        {userInfo.logo ? (
          <img
            src={userInfo.logo}
            className="border-2 size-11 cursor-pointer rounded-full"
            alt="profile"
          />
        ) : (
          <p className="border-2 size-11 cursor-pointer rounded-full items-center justify-center flex">
            {userInfo.name.slice(0, 1).toUpperCase()}
          </p>
        )}

        {isProfileTooltipOpen && (
          <div className="absolute right-0 top-12 z-20 flex min-w-max w-[230px] flex-col rounded-xl text-black border bg-white p-4 text-sm font-medium shadow-2xl dark:bg-custom-gray-20">
            <div className="flex items-center gap-5 p-2.5">
              {userInfo && userInfo.logo ? (
                <img
                  src={userInfo.logo}
                  alt="picture"
                  className="size-11 rounded-full"
                />
              ) : (
                <h4 className="bg-indigo-600 size-11 rounded-full flex items-center justify-center text-white">
                  {userInfo.name[0].toUpperCase()}
                </h4>
              )}

              <div className="text-start">
                <h4 className="text-sm font-semibold">{userInfo.name}</h4>
                <p className="text-xs">{userInfo.email}</p>
              </div>
            </div>

            <div
              className="flex cursor-pointer items-center gap-2 border-t-2 border-[#DCDCDC] p-2.5"
              onClick={() => {
                setIsProfileTooltipOpen(false);
                Router.push("/profile");
              }}
            >
              <FaUserAstronaut className="cursor-pointer text-xl transition-all duration-700" />
              <p>Profile</p>
            </div>

            <div
              className="flex cursor-pointer items-center gap-2 border-t-2 border-[#DCDCDC] p-2.5"
              onClick={() => {
                localStorage.removeItem("authToken");
                Router.reload();
              }}
            >
              <BiLogOut className="cursor-pointer text-2xl transition-all duration-700" />
              <p>Logout</p>
            </div>
          </div>
        )}
      </button>
      {isProfileTooltipOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsProfileTooltipOpen(false)}
        />
      )}
    </>
  );
};

export default ProfileTooltip;
