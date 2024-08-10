import { postRequest } from "@/GlobalFunctions/ApiRequest";
import { errorToast, successToast } from "@/GlobalFunctions/toasts";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ApplyJob() {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { id } = router.query;
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("job", id);
    form.append("cv", file);

    try {
      await postRequest("/applied-jobs/apply", form, "multipart/form-data");

      successToast("Your Application is Submitted , Redirecting ... ");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center py-20">
      <h1 className="mb-8 mt-4 border-b-2 border-b-indigo-600 py-2 text-xl font-semibold uppercase tracking-widest md:text-2xl lg:text-4xl">
        Enter Your Info
      </h1>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="mx-4 h-full w-full px-4 md:w-1/2"
      >
        <div className="mb-4 flex w-full flex-col items-start justify-center">
          <label className="mb-1 text-base font-semibold">Upload CV :</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files[0].type !== "application/pdf") {
                errorToast("Only PDF files are allowed");
                return;
              }
              setFile(e.target.files[0]);
            }}
            className="mb-2 w-full rounded border border-indigo-600 px-3 py-2"
          />
        </div>

        {(file || userInfo?.cv) && (
          <embed
            src={file ? URL.createObjectURL(file) : userInfo?.cv}
            className="mb-6 h-[600px] w-full rounded"
          />
        )}

        <button
          type="submit"
          className="w-full rounded bg-indigo-600 py-2 font-semibold tracking-widest text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
