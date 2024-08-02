import { postRequest } from "@/GlobalFunctions/ApiRequest";
import { errorToast, successToast } from "@/GlobalFunctions/toasts";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function ApplyJob() {
  const router = useRouter();
  const { id } = router.query;
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("jobId", id);
    form.append("cv", file);

    try {
      await postRequest("/jobs", formData, "multipart/form-data");

      successToast("Your Application is Submitted , Redirecting ... ");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full  py-20 flex items-center  justify-center flex-col">
      <h1 className="text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl">
        Enter Your Info
      </h1>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="sm:w-1/2 w-full px-4 mx-4  h-full"
      >
        <div className="w-full mb-4 flex flex-col items-start justify-center">
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
            className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
          />
        </div>

        {file && (
          <embed
            src={URL.createObjectURL(file)}
            className="w-full mb-6 rounded h-[600px]"
          />
        )}

        <button
          type="submit"
          className="w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
