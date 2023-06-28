import React, { useState } from "react";
import ModalBox, {
  ModalBody,
  ModalFooter,
} from "../../../components/modal.js/ModalBox";
import { CoverLoaderMedium } from "../../../components/loaders/loader";
import { ToastContainer, toast } from "react-toastify";
import Page from "../../../components/shared/page";
import {
  useGetBySatUserQuery,
  useAddNewSatMutation,
  useUpdateSatMutation,
} from "../../../apiSlice/satSlice";
import useAuth from "../../../hooks/useAuth";
import NoContent from "../../../components/indications/noContent";
import SatScoreComponent from "../../../components/scores/SatScore";
function SatScore() {
  const student = useAuth();
  const {
    data: sats,
    isLoading: loadSat,
    isSuccess: satloaded,
    isError: satError,
    error: satMessage,
  } = useGetBySatUserQuery(student.id);
  const [addTestScore, { isLoading, isSuccess, isError, error }] =
    useAddNewSatMutation();
  const [readyToAddSat, setReadyToAddSat] = useState(false);
  const [totalScore, setTotalScore] = useState("");
  const [mathScore, setMathScore] = useState("");
  const [englishScore, setEnglishScore] = useState("");
  const [dateTaken, setDateTaken] = useState("");
  const [state, setState] = useState("");

  console.log(sats);

  let content;
  const loading = loadSat || isLoading;

  async function addSat() {
    try {
      let res = await addTestScore({
        user: student.id,
        date: dateTaken,
        state: state,
        totalScore: totalScore,
        reading: englishScore,
        math: mathScore,
      });
      if (res.data.isSuccess) {
        setReadyToAddSat(false);
        toast.success(`You have successfully added a test score`, {
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

  if (!sats?.length) {
    content = <NoContent message="No Sat Test score" />;
  }

  if (sats?.length) {
    content = sats.map((sat) => {
      return (
        <SatScoreComponent
          date={sat.date}
          state={sat.state}
          totalScore={sat.totalScore}
          EVBRW={sat.reading}
          Math={sat.math}
        />
      );
    });
  }

  return (
    <>
      <Page>
        <div className="py-1 w-full flex flex-row justify-center fixed bottom-3 left-0">
          <button
            className="py-2 self-center px-4 bg-MdBlue rounded-xl text-white font-bold"
            onClick={() => setReadyToAddSat(true)}
          >
            Add Sat Test Score
          </button>
        </div>

        {content}
      </Page>
      <ToastContainer />
      {loading && (
        <CoverLoaderMedium
          styles={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        />
      )}
      {readyToAddSat && (
        <ModalBox modalHeader="SAT test score">
          <ModalBody>
            <label htmlFor="totalScore" className="font-bold">
              Total SAT score
            </label>
            <input
              type="text"
              id="totalScore"
              onChange={(e) => setTotalScore(e.target.value)}
              placeholder="1600"
              className="rounded-md w-80"
              required
            />
            <div className="flex flex-row">
              <label htmlFor="mathScore" className="font-bold">
                Math score
                <input
                  type="text"
                  id="mathScore"
                  onChange={(e) => setMathScore(e.target.value)}
                  placeholder="800"
                  className="rounded-md w-20"
                  required
                />
              </label>
              <label htmlFor="engScore" className="font-bold">
                Reading /W score
                <input
                  type="text"
                  id="mathScore"
                  onChange={(e) => setEnglishScore(e.target.value)}
                  placeholder="800"
                  className="rounded-md w-20"
                  required
                />
              </label>
            </div>
            <label htmlFor="engScore" className="font-bold mt-5">
              Date Taken
              <input
                type="date"
                id="engScore"
                onChange={(e) => setDateTaken(e.target.value)}
                placeholder="800"
                className="rounded-md w-40 mx-3"
                required
              />
            </label>
            <label
              for="fileTag"
              className="block mb-2  mt-10  self-center md:w-8/12 text-sm font-medium text-gray-900 dark:text-white"
            >
              * I took the test score from?
            </label>
            <select
              id="fileTag"
              className="bg-gray-50 self-center md:w-8/12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setState(e.target.value)}
            >
              <option selected value="">
                Select an option
              </option>
              <option value="Official" selected={state == "Official"}>
                Official Test Score
              </option>
              <option value="trial" selected={state == "trial"}>
                Bootcamp Trial Test score
              </option>
            </select>
          </ModalBody>
          <ModalFooter class="py-2 justify-end px-4">
            <button
              className="py-2 px-3 mx-3 font-bold text-pink-700 rounded-md disabled:text-gray-300 disabled:cursor-not-allowed"
              onClick={() => setReadyToAddSat(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="py-2 px-3 bg-emerald-700 font-bold text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={addSat}
              disabled={
                !totalScore ||
                loading ||
                !mathScore ||
                !englishScore ||
                !dateTaken ||
                !state
              }
            >
              {!loading ? "Add test score" : "Adding score..."}
            </button>
          </ModalFooter>
        </ModalBox>
      )}
    </>
  );
}

export default SatScore;
