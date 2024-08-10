import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { postRequest } from "@/GlobalFunctions/ApiRequest";

export default function Register() {
  const [formData, setFormData] = useState({
    logo: null,
    name: "",
    email: "",
    company: null,
    address: "",
    password: "",
    cv: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postRequest("/auth/register", formData, "application/json");
      Router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto flex h-full min-h-screen w-full flex-col items-center justify-center bg-indigo-600 px-6 py-8 text-center shadow-xl lg:py-0">
      <div className="w-full rounded-lg bg-white text-black shadow sm:max-w-md md:mt-0 xl:p-0 dark:border">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Register your account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="text-left">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Your Name
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                placeholder="Name"
                required
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                type="text"
                name="address"
                id="address"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                placeholder="City"
                required
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Sign Up
            </button>
            <p className="text-sm font-light text-gray-500">
              Already have an account{" "}
              <Link
                href="/auth/login"
                className="font-medium text-indigo-600 hover:underline"
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
