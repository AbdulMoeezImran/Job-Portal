import { putRequest } from "@/GlobalFunctions/ApiRequest";
import { errorToast, successToast } from "@/GlobalFunctions/toasts";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      errorToast("Password and Confirm Password does not match");
      return;
    }

    try {
      await putRequest(
        `/auth/resetPassword/${id}`,
        formData,
        "application/json"
      );
      successToast("Password changed successfully. Redirecting...");
      setTimeout(() => {
        Router.push("/auth/login");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-indigo-600 text-center justify-center px-6 py-8 mx-auto min-h-screen h-full lg:py-0">
      <div className="w-full p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md  sm:p-8">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
          Reset Password
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
        >
          <div className="text-left">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              New Password
            </label>
            <input
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 "
              required
            />
          </div>
          <div className="text-left">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Confirm password
            </label>
            <input
              onChange={e =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 "
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Reset passwod
          </button>
        </form>
      </div>
    </div>
  );
}
