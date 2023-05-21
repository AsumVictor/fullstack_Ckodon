import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Lottie from "lottie-react";
import NoContent from "../../../components/indications/noContent";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";
import useAuth from "../../../hooks/useAuth";
import {
    useAddNewAidMutation,
    useGetAidByUserQuery,
    useUpdateAidMutation,
  } from "../../../apiSlice/aidSlice";
  import {
    useGetReviewByDocumentQuery,
    useDeleteReviewMutation,
    useUpdateReviewMutation,
    useAddNewReviewMutation,
  } from "../../../apiSlice/reviewsApiSlice";
  import Page from "../../../components/shared/page";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { CoverLoaderMedium } from "../../../components/loaders/loader";
  import ModalBox, {
    ModalBody,
    ModalFooter,
  } from "../../../components/modal.js/ModalBox";

  
export default function CreateAids() {
    const student = useAuth();
    const {
      data: aids,
      isLoading: fetchLoading,
      isSuccess,
      isError,
      error,
    } = useGetAidByUserQuery(student.id);
    const [addNewAid, {isLoading: addLoading}] = useAddNewAidMutation()
    const [updateAid, {isLoading: updateLoading}] = useUpdateAidMutation()
    const [updateReview] = useUpdateReviewMutation();
    const [addReview, {isLoading: addReviewLoad}] = useAddNewReviewMutation();
    const [deleteReview, {isLoading: deleteReviewLoad}] = useDeleteReviewMutation();
    const loading = fetchLoading || addLoading || updateLoading  || addReviewLoad || deleteReviewLoad;
    const [aidData, setAidData] = useState(null);
    const [readyToAddSchool, setReadyToAddSchool] = useState(false);
    const [schoolName, setSchoolName] = useState("");

    useEffect(() => {
      if (aids) {
        setAidData({ ...aids });
      }
    }, [aids]);


 async function addSchoolAndAid() {
   const newAid = {
    SchoolName: schoolName,
    comments: [{comment: ''}],
    totalAnnualIncome:'',
    familySaving: '',
    totalExpensePerYear:'',
    EFC: '',
    voiceNOtes:[], 
    additionalDocs:[],
    rate:'notRated'

   }
   let newAids= {...aidData };
   let updateAids = [...newAids.aids];
   updateAids = [...updateAids, newAid];

   try {
    const res = await updateAid({
      ...aidData,
      id: aidData._id,
      aids: updateAids
    });
    if (res.data) {
      setSchoolName("");
      setReadyToAddSchool(false);
      toast.success("New school Created successfully", {
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
    if (res.error) {
      toast.error(res.error.data.message, {
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
    toast.error(`Error occured! Please try again`, {
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

  function HanldeInput(e, index) {
    const { name, value } = e.target;
    setAidData((prevData) => {
      let newState = {...prevData};
       let newAids = [...newState.aids]
       newAids[index] = {
        ...newAids[index],
        [name]: value,
      };
      return {...newState, aids:newAids};
    });
  }

  //Delete Aid data
  async function deleteSchoolAid(index) {
    let newState = {...aidData };
    let aids = [...newState.aids];
    const updatedAid = aids.filter(
      (child) => aids.indexOf(child) !== index
    );

    try {
        const res = await updateAid({
          ...aidData,
          id: aidData._id,
          aids: updatedAid
        });
        if (res.data) {
          toast.warn(`You have deleted ${aids[index].SchoolName}'s financial infomation`, {
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
        if (res.error) {
          toast.error(res.error.data.message, {
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
        toast.error(`Error occured! Please try again`, {
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

  async function createAidList(){

    try {
        const res = await addNewAid(
            {
                user: student.id,
                status: 'unresolved',
                submitted: false,
                submittedBefore: false,
                aids: []
            }
        );
  
        if (res.data) {
          toast.success("You have created financial aid list", {
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
  
        if (res.error) {
          toast.error(res.error.data.message, {
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
        toast.error(`Error occured! Please try again`, {
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
  
  async function submitToReview(e) {
    e.preventDefault()
    try {
      let response =  await addReview({
        deadline: null,
        status: "unresolved",
        documentId: aidData._id,
        onModel: "Aid",
        user: aidData.user,
      });

      if (response?.data?.isSuccess) {
        let res = await updateAid({
          ...aidData,
          id: aidData._id,
          submitted: true,
          submittedBefore: true,
        });

        if (res.data) {
          toast.success(`You have Submitted your financial aid lists for review.`, {
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
          toast.error(`${res.error.data.message}`, {
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
      } else {
        toast.error(`${response.error.data.message}`, {
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
      toast.error(`${error.message}`, {
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

  async function submitToReviewAnother(e) {
    e.preventDefault()
    try {
      let response = await updateReview({
        deadline: null,
        status: "unresolved",
        document: aidData._id,
        model: "Aid",
        user: aidData.user,
      });

      if (response?.data?.isSuccess) {
        let res = await updateAid({
          ...aidData,
          id: aidData._id,
          submitted: true,
        });

        if (res?.data?.isSuccess) {
          toast.success(`You have Submitted your activity for review.`, {
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
          toast.error(`${res.error.data.message}`, {
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
      } else {
        toast.error(`${response.error.data.message}`, {
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
      toast.error(`${error.message}`, {
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

  async function withdraw() {
    try {
     let response = await deleteReview(aidData._id)
     if (response.data) {
       let res = await updateAid({
         ...aidData,
         id: aidData._id,
         submitted: false,
         submittedBefore: false,
       });
 
       if (res.data) {
         toast.warn(`You have withdraw your activities for review.`, {
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
         toast.error(`${res.error.data.message}`, {
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
     } else {
       toast.error(`${response.error.data.message}`, {
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
      toast.error(`Error Occured! Try again later`, {
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

//Save changes
async function saveChanges() {
  try {
    const res = await updateAid({
      ...aidData,
      id: aidData._id,
    });

    if (res.data) {
      toast.success("Changes saved successfully", {
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

    if (res.error) {
      toast.error(res.error.data.message, {
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
    toast.error(`Error occured! Please try again`, {
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

  if (!aidData) {
    return (
      <>
        <div className="flex flex-col">
          <NoContent message={`You have created financial aid yet`} />
          <div
            className="cursor-pointer border-2 py-2 px-4 rounded-md border-MdBlue hover:bg-MdBlue hover:text-white active:scale-95 flex flex-row items-center mt-10 font-bold text-MdBlue text-18 md:text-20 self-center"
             onClick={createAidList}
          >
            <HiOutlinePlus /> <span> Add financial aids</span>
          </div>
        </div>
        <ToastContainer />
        {loading && (
          <CoverLoaderMedium
            styles={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          />
        )}
      </>
    );
  }

  if (aidData.submitted) {
    return (
      <>
        <div className="flex flex-col">
          <h1 className="mt-10 text-center px-3 font-bold text-2xl md:px-10">
            You have submitted your financial aid list and it's under-review.
          </h1>
          <button
            className="mt-10 py-2 px-4 bg-red-900 active:scale-105 hover:bg-red-700 text-white rounded-md self-center font-bold"
            onClick={withdraw}
          >
            Withdraw
          </button>
        </div>
        <ToastContainer />
        {loading && (
          <CoverLoaderMedium
            styles={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          />
        )}
      </>
    );
  }


  return (
    <>
    <Page>

    <h1 className="self-center mt-2 text-2xl text-MdBlue font-semibold">
          My financial aid lists
        </h1>
        
        <div
      className="w-full md:w-8/12 flex flex-col items-center self-center"
    >
  {aidData.aids.map((aiddata, index) => (
        <div className="flex flex-col w-full border-2 border-MdBlue pb-10 rounded-md mt-10 overflow-hidden px-2 md:px-10">
          <aside className="flex flex-row relative justify-between w-full py-3 bg-MdBlue items-center pl-3 pr-10 md:px-10 rounded-b-lg">
          <h3 className="text-white font-bold text-1">{aiddata.SchoolName}</h3>
            <h3 className="text-white font-bold text-15">Status</h3>
            <button
              type="button"
               onClick={() =>deleteSchoolAid(index)}
              className="py-1 px-2 bg-red-100 text-red-600 font-bold text-2xl mx-2 rounded-md"
            >
              <HiOutlineTrash />
            </button>
          </aside>

          {/* Aid value and params */}
          <div className="flex w-full flex-wrap px-2 justify-between md:px-10">
            <label className="w-full md:w-5/12 mt-5">
              <span className="font-bold">{`Total Annual Family Income ($) `}</span>
              <br />
              <input
                name="totalAnnualIncome"
                type="text"
                required
                value={aiddata.totalAnnualIncome}
                 onChange={(e) => HanldeInput(e, index)}
                min={0}
                placeholder="Family income in dollars. eg. $7,000"
                className="text-black w-full md:w-12/12 border-2 border-MdBlue500 rounded-md invalid:border-red-800 px-2 outline-MdBlue"
              />
            </label>

            <label className="w-full md:w-5/12 mt-5">
              <span className="font-bold">{`Total Family Savings ($) `}</span>
              <br />
              <input
                name="familySaving"
                type="text"
                required
                value={aiddata.familySaving}
                 onChange={(e) => HanldeInput(e, index)}
                min={0}
                placeholder="Total Family Savings. eg $6,000"
                className="text-black w-full border-2 border-MdBlue500 rounded-md invalid:border-red-800 px-2 outline-MdBlue"
              />
            </label>

            <label className="w-full md:w-5/12 mt-5">
              <span className="font-bold">{`Total Expenses per year ($) `}</span>
              <br />
              <input
                name="totalExpensePerYear"
                type="text"
                min={0}
                required
                value={aiddata.totalExpensePerYear}
                 onChange={(e) => HanldeInput(e, index)}
                placeholder="Total Expenses per year eg. $2,000"
                className="text-black w-full border-2 border-MdBlue500 rounded-md invalid:border-red-800 px-2 outline-MdBlue"
              />
            </label>

            <label className="w-full md:w-5/12 mt-5">
              <span className="font-bold">{`Total Family Contribution/Year($) `}</span>
              <br />
              <input
                name="EFC"
                type="text"
                min={0}
                required
                value={aiddata.EFC}
                 onChange={(e) => HanldeInput(e, index)}
                placeholder="Total Family Contribution eg. $5,000"
                className="text-black w-full border-2 border-MdBlue500 rounded-md invalid:border-red-800 px-2 outline-MdBlue"
              />
            </label>
          </div>
        </div>
      ))}
    </div>
    <button
            type="button"
            onClick={saveChanges}
            className="self-end mr-20 bg-MdBlue text-white px-3 py-1 rounded-md mt-4"
          >
            Save Changes
          </button>
    {aidData.aids.length >= 5 && !aidData.submittedBefore && (
          <button
            className="capitalize px-5 flex flex-row justify-center items-center disabled:bg-gray-400 py-2 bg-MdBlue rounded-md text-white font-bold mt-20"
            type="submit"
            onClick={submitToReview}
          >
            {loading ? <>Submitting...</> : <>Submit for review </>}
          </button>
        )}

        {aidData.aids.length >= 5 && aidData.submittedBefore && (
          <button
            className="capitalize px-5 flex flex-row justify-center items-center disabled:bg-red-400 py-2 bg-MdBlue rounded-md text-white font-bold mt-20"
            type="submit"
            onClick={submitToReviewAnother}
          >
            {loading ? <>Submitting...</> : <>Submit for review </>}
          </button>
        )}
        <button
          type="button"
          className="px-5 py-2 bg-white hover:bg-MdBlue hover:text-white flex flex-row
                             justify-center items-center text-MdBlue border-2 border-MdBlue font-bold rounded-md
                             mx-5 mt-10 self-center"
          onClick={()=>setReadyToAddSchool(true)}
        >
          <HiOutlinePlus />
          Add New School Financial Aid
        </button>
    </Page>
    <ToastContainer />
      {loading && (
        <CoverLoaderMedium
          styles={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        />
      )}
    {readyToAddSchool && (
        <ModalBox modalHeader="Enter school Name">
          <ModalBody>
            <input
              type="text"
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Enter the name of the school"
              className="rounded-md w-80"
              required
            />
          </ModalBody>
          <ModalFooter class="py-2 justify-end px-4">
            <button
              className="py-2 px-3 mx-3 font-bold text-pink-700 rounded-md disabled:text-gray-300 disabled:cursor-not-allowed"
              onClick={() => setReadyToAddSchool(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="py-2 px-3 bg-emerald-700 font-bold text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={addSchoolAndAid}
              disabled={!schoolName || loading}
            >
              {!loading ? "Create school" : "Add school..."}
            </button>
          </ModalFooter>
        </ModalBox>
      )}
    </>
    );

}