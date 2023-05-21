import React, { useState } from "react";
import Page from "../../../components/shared/page";
import FileBase64 from "react-file-base64";
import { CoverLoaderMedium } from "../../../components/loaders/loader";
import { useAddNewfileMutation } from "../../../apiSlice/filesApiSclice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PostFile() {
  const [fileType, setFileType] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [fileTag, setFileTag] = useState(null);
  const [PostFile, { isLoading, isSuccess, isError, error }] =
    useAddNewfileMutation();

  async function postFile() {
    try {
      let res = await PostFile({
        fileContent,
        fileType,
        fileTag,
      });

      if (res.data.isSuccess) {
        setFileType(null);
        setFileContent(null);
        setFileTag(null);
        toast.success("Your file has been sent successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (res.error) {
        toast.error(`${res.error.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Error occured! Try again", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Error occured! Try again", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <>
      <Page>
        <label
          for="fileType"
          className="block mb-2 self-center md:w-8/12 text-sm font-medium text-gray-900 dark:text-white"
        >
          * Which type of file do you want to upload
        </label>
        <select
          id="fileType"
          className="bg-gray-50  self-center md:w-8/12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setFileType(e.target.value)}
        >
          <option selected value="">
            Choose a file type
          </option>
          <option value="video" selected={fileType == "video"}>
            Video
          </option>
          <option value="image" selected={fileType == "image"}>
            Image
          </option>
          <option value="pdf" selected={fileType == "pdf"}>
            Pdf
          </option>
        </select>

        {fileType == "video" && (
          <label className="w-full self-center md:w-8/12 mt-5">
            <span className="font-bold">{` Link to the video `}</span>
            <br />
            <input
              name="link"
              type="url"
              required
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              placeholder="https://youtube.com/UYFYtYj7gjUfgg4"
              className="text-black w-full md:w-12/12 border-2 border-MdBlue500 rounded-md invalid:border-red-800 px-2 outline-MdBlue"
            />
          </label>
        )}

        {(fileType == "image" || fileType == "pdf") && (
          <div className="w-full mt-10 md:w-8/12 flex justify-center">
            <FileBase64
              multiple={false}
              id="file"
              onDone={({ base64 }) => setFileContent(base64)}
            />
          </div>
        )}

        <label
          for="fileTag"
          className="block mb-2  mt-10  self-center md:w-8/12 text-sm font-medium text-gray-900 dark:text-white"
        >
          * Which Specfic stage are you posting this file to
        </label>
        <select
          id="fileTag"
          className="bg-gray-50 self-center md:w-8/12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setFileTag(e.target.value)}
        >
          <option selected value="">
            Tag a specific stag...
          </option>
          <option value="honor" selected={fileTag == "honor"}>
            Honors
          </option>
          <option value="activity" selected={fileTag == "activity"}>
            Activities
          </option>
          <option value="essay" selected={fileTag == "essay"}>
            Essays
          </option>
          <option value="recommendation" selected={fileTag == "recommendation"}>
            Recommendations
          </option>
          <option value="financialaid" selected={fileTag == "financialaid"}>
            Financial Aid
          </option>
        </select>

        <div className="flex justify-center ">
          <button className="py-2 mt-10 rounded-md px-4 bg-MdBlue text-white font-bold disabled:bg-gray-300"
              onClick={postFile}
              disabled={!fileTag || !fileType || !fileContent}
        >
            Post File
          </button>
        </div>
      </Page>
      <ToastContainer />
      {isLoading && (
        <CoverLoaderMedium
          styles={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        />
      )}
    </>
  );
}

export default PostFile;
