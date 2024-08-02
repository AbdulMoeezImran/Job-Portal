import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { postRequest } from "@/GlobalFunctions/ApiRequest";
import { useDispatch } from "react-redux";
import { setUserData } from "@/Redux/slice";

export default function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await postRequest(
        "/auth/login",
        formData,
        "application/json"
      );
      console.log(data);
      localStorage.setItem("authToken", data.accessToken);
      dispatch(setUserData(data.userInfo));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-indigo-600 text-center justify-center px-6 py-8 mx-auto min-h-screen h-full lg:py-0">
      <div className="w-full bg-white text-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Sign in to your account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="text-left">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <input
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 "
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                onChange={e =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                required
              />
            </div>
            <Link
              href="/auth/forget-password"
              className="text-sm font-medium text-indigo-600 hover:underline "
            >
              Forgot password?
            </Link>
            <button
              type="submit"
              className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light ">
              Don’t have an account yet?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-indigo-600 hover:underline "
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
