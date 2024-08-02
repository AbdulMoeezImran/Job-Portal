import { postRequest } from "@/GlobalFunctions/ApiRequest";
import { successToast } from "@/GlobalFunctions/toasts";
import { setUserData } from "@/Redux/slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function employerSetup() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    company: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = await postRequest(
        "/auth/employerSetup",
        formData,
        "application/json"
      );

      successToast("You have been registered as an employer.");
      dispatch(setUserData(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-indigo-600 text-center justify-center px-6 py-8 mx-auto min-h-screen h-full lg:py-0">
      <div className="w-full p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md  sm:p-8">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
          Become an employer
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
        >
          <div className="text-left">
            <label
              htmlFor="company"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Company
            </label>
            <input
              onChange={e =>
                setFormData({ ...formData, company: e.target.value })
              }
              type="Text"
              name="company"
              id="company"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 "
              placeholder="Company's name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
