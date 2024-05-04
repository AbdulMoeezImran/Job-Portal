import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { postRequest } from "@/GlobalFunctions/ApiRequest";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await postRequest("/auth/register", formData, "application/json");
      Router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full bg-indigo-600 flex-col text-center items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 shadow-xl">
      <div className="w-full bg-white rounded-lg shadow dark:border text-black md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Register your account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="text-left">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your Name
              </label>
              <input
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                name="name"
                id="namw"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                placeholder="Name"
                required
              />
            </div>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
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

            <button
              type="submit"
              className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Sign Up
            </button>
            <p className="text-sm font-light text-gray-500 ">
              Already have an account{" "}
              <Link
                href="/auth/login"
                className="font-medium text-indigo-600 hover:underline "
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
