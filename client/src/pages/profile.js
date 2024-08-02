import React, { useState } from "react";
import Link from "next/link";
import { putRequest } from "@/GlobalFunctions/ApiRequest";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { successToast } from "@/GlobalFunctions/toasts";
import { setUserData } from "@/Redux/slice";

const profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  const [formData, setFormData] = useState({
    logo: userInfo?.logo,
    name: userInfo?.name,
    email: userInfo?.email,
    company: userInfo?.company,
    address: userInfo?.address,
  });

  const updateProfile = async e => {
    e.preventDefault();

    const form = new FormData();
    form.append("logo", formData.logo);
    form.append("name", formData.name);
    form.append("company", formData.company);
    form.append("address", formData.address);

    form.forEach((key, value) => {
      console.log(value, key);
    });

    try {
      const data = await putRequest(
        "/auth/userinfo",
        form,
        "multipart/form-data"
      );
      dispatch(setUserData(data));
      successToast("Profile Updated");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileSelection = event => {
    const file = event.target.files[0];
    if (file && /\.(gif|png|jpeg)$/i.test(file.name)) {
      setFormData({ ...formData, logo: file });
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.value = "";
      }
    } else {
      alert(
        "Enter the valid image file. You can use png, jpeg, and Gif as your profile picture"
      );
    }
  };

  return (
    <div className="w-full py-20 flex items-center md:px-8 px-2 justify-center flex-col">
      <div className="w-full h-20 flex-rwcb">
        <h1 className="text-3xl text-indigo-600 font-bold">Profile Details</h1>
      </div>
      <form
        className="flex flex-col gap-6 py-4 w-full"
        onSubmit={updateProfile}
      >
        <div className="gap-x-4 gap-y-1 max-md:flex-col md:flex">
          <p className="w-full font-medium md:w-1/4">Avatar:</p>

          <div className="relative size-[125px]">
            <label>
              <input
                id="fileInput"
                type="file"
                accept=".gif, .png, .jpeg"
                onChange={event => handleFileSelection(event)}
                className="hidden"
              />
              <div
                title="Change Avatar"
                className="flex-rcc text-black absolute right-[0.5px] top-[0.5px] size-[22px] -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full hover:text-indigo-600 bg-white"
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
              <p className="bg-gray-50 border border-gray-300 text-gray-900 size-full rounded-lg items-center justify-center flex">
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
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full md:w-[75%] p-2.5"
          />
        </div>
        <div className="md:flex-rc max-md:flex-c gap-x-4 gap-y-1">
          <p className="w-full font-medium md:w-1/4">Email:</p>
          <p className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full md:w-[75%] p-2.5">
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
            onChange={e =>
              setFormData({ ...formData, company: e.target.value })
            }
            placeholder="Enter your company name"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full md:w-[75%] p-2.5"
          />
        </div>
        <div className="md:flex-rc max-md:flex-c gap-x-4 gap-y-1">
          <p className="w-full font-medium md:w-1/4">Address:</p>
          <input
            type="text"
            value={formData.address}
            onChange={e =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Enter your address"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full md:w-[75%] p-2.5"
          />
        </div>

        <button
          type="submit"
          className="w-fit self-end text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default profile;
