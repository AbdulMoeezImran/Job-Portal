import React, { useState } from "react";
import Link from "next/link";
import { putRequest } from "@/GlobalFunctions/ApiRequest";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { successToast } from "@/GlobalFunctions/toasts";
import { setUserData } from "@/Redux/slice";

const profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [formData, setFormData] = useState({
    logo: userInfo?.logo,
    name: userInfo?.name,
    email: userInfo?.email,
    company: userInfo?.company,
    address: userInfo?.address,
  });

  const updateProfile = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("address", formData.address);
    if (formData.logo) {
      form.append("logo", formData.logo);
    }
    if (formData.company) {
      form.append("company", formData.company);
    }

    form.forEach((key, value) => {
      console.log(value, key);
    });

    try {
      const data = await putRequest(
        "/auth/userinfo",
        form,
        "multipart/form-data",
      );
      dispatch(setUserData(data));
      successToast("Profile Updated");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    if (file && /\.(gif|png|jpeg)$/i.test(file.name)) {
      setFormData({ ...formData, logo: file });
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.value = "";
      }
    } else {
      alert(
        "Enter the valid image file. You can use png, jpeg, and Gif as your profile picture",
      );
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-2 py-20 md:px-8">
      <div className="flex-rwcb h-20 w-full">
        <h1 className="text-3xl font-bold text-indigo-600">Profile Details</h1>
      </div>
      <form
        className="flex w-full flex-col gap-6 py-4"
        onSubmit={updateProfile}
      >
        <div className="gap-x-4 gap-y-1 max-md:flex-col md:flex">
          <p className="w-full font-medium md:w-1/4">Avatar:</p>

          <div className="relative size-[125px]">
            <label>
              <input
                id="fileInput"
                type="file"
                accept="jpg, .png, .jpeg"
                onChange={(event) => handleFileSelection(event)}
                className="hidden"
              />
              <div
                title="Change Avatar"
                className="flex-rcc absolute right-[0.5px] top-[0.5px] size-[22px] -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full bg-white text-black hover:text-indigo-600"
              >
                <BiEdit sx={{ fontSize: 14 }} />
              </div>
            </label>
            {formData.logo ? (
              <img
                src={
                  typeof formData.logo === "string" &&
                  formData.logo.startsWith("http")
                    ? formData.logo
                    : URL.createObjectURL(formData.logo)
                }
                alt="userProfile"
                className="size-full rounded-lg"
              />
            ) : (
              <p className="flex size-full items-center justify-center rounded-lg border border-gray-300 bg-gray-50 text-gray-900">
                {formData.name && formData.name.slice(0, 1).toUpperCase()}
              </p>
            )}
          </div>
        </div>

        <div className="md:flex-rc max-md:flex-c gap-x-4 gap-y-1">
          <p className="w-full font-medium md:w-1/4">Name:</p>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
            required
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm md:w-[75%]"
          />
        </div>
        <div className="md:flex-rc max-md:flex-c gap-x-4 gap-y-1">
          <p className="w-full font-medium md:w-1/4">Email:</p>
          <p className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm md:w-[75%]">
            {userInfo && userInfo.email}
          </p>
        </div>
        <div className="md:flex-rc max-md:flex-c gap-x-4 gap-y-1">
          <p className="w-full font-medium md:w-1/4">
            Company:{" "}
            <span className="text-sm text-indigo-600">(Become Employer)</span>
          </p>
          <input
            type="text"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            placeholder="Enter your company name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm md:w-[75%]"
          />
        </div>
        <div className="md:flex-rc max-md:flex-c gap-x-4 gap-y-1">
          <p className="w-full font-medium md:w-1/4">Address:</p>
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Enter your address"
            required
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm md:w-[75%]"
          />
        </div>

        <button
          type="submit"
          className="w-fit self-end rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default profile;
