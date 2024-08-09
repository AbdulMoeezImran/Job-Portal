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
      await postRequest("/applied-jobs", form, "multipart/form-data");

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
        {!file && userInfo?.cv && (
          <div className="mb-4 flex w-full flex-col items-start justify-center">
            <p className="mb-1 text-base font-semibold">Saved CV :</p>
            <div className="flex-rwcb w-full">
              <p>
                You can use the saved CV to continue with your application or
                upload a new CV.
              </p>
              <Link
                href={userInfo?.cv}
                className="flex-rcc w-20 rounded border border-indigo-600 py-2 text-xs text-indigo-600 transition-all duration-700 hover:bg-indigo-600 hover:text-white"
              >
                Download CV
              </Link>
            </div>
          </div>
        )}
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

        {file && (
          <embed
            src={URL.createObjectURL(file)}
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
