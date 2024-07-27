import { postRequest } from "@/GlobalFunctions/ApiRequest";
import { successToast } from "@/GlobalFunctions/toasts";
import React, { useState } from "react";

export default function ForgetPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = await postRequest(
        "/auth/forgetPassword",
        formData,
        "application/json"
      );
      console.log(data);
      successToast("Password reset link has been sent to your email.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-indigo-600 text-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div className="w-full p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md  sm:p-8">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
          Forgot Your Password?
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
        >
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
          <button
            type="submit"
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Forgot Password
          </button>
        </form>
      </div>
    </div>
  );
}
