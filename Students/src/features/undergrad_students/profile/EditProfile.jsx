import React, { useState, useRef, useEffect } from "react";
import "./tags.css";
import { WithContext as ReactTags } from "react-tag-input";
import TextareaAutosize from "react-textarea-autosize";
import useAuth from "../../../hooks/useAuth";
import FileBase64 from "react-file-base64";
import { useUpdateUserMutation } from "../../../apiSlice/studentsApiSlice";
import { CoverLoaderMedium } from "../../../components/loaders/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

function EditProfile() {
  const student = useAuth();
  const [profile, setProfile] = useState({ ...student });
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const majors = profile.intendedMajor.map((major) => {
    return {
      id: major.text,
      text: major.text,
    };
  });
  const interests = profile.keyInterest.map((interest) => {
    return {
      id: interest.text,
      text: interest.text,
    };
  });

  const [intendedMajor, setIntendedMajor] = useState(majors);
  const [keyInterest, setKeyInterest] = useState(interests);
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const oldpassref = useRef();
  const [oldmismatcherror, setOldmismatcherror] = useState("");

  const handleDelete1 = (i) => {
    setIntendedMajor(intendedMajor.filter((tag, index) => index !== i));
  };

  const handleAddition1 = (tag) => {
    setIntendedMajor([...intendedMajor, tag]);
  };

  const handleDrag1 = (tag, currPos, newPos) => {
    const newIntendedMajor = intendedMajor.slice();

    newIntendedMajor.splice(currPos, 1);
    newIntendedMajor.splice(newPos, 0, tag);

    // re-render
    setIntendedMajor(newIntendedMajor);
  };

  const handleTagClick1 = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const handleDelete2 = (i) => {
    setKeyInterest(keyInterest.filter((tag, index) => index !== i));
  };

  const handleAddition2 = (tag) => {
    setKeyInterest([...keyInterest, tag]);
  };

  const handleDrag2 = (tag, currPos, newPos) => {
    const newKeyInterest = keyInterest.slice();

    newKeyInterest.splice(currPos, 1);
    newKeyInterest.splice(newPos, 0, tag);

    // re-render
    setKeyInterest(newKeyInterest);
  };

  const handleTagClick2 = (index) => {
    console.log("The tag at index " + index + " was clicked")
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function updateWithoutPassword() {
    try {
      let res = await updateUser({
        ...profile,
        id: profile.id,
        intendedMajor: intendedMajor,
        keyInterest: keyInterest,
        updatedStatus: true,
      });

      if (res.data) {
        toast.success('You have succesfully update your profile', {
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

      if(res.error){
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
      toast.error(error.message, {
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

  const updateWithPassword = async (e) => {
    e.preventDefault();
    try {
      let res = await updateUser({
        ...profile,
        oldPassword: oldpassword,
        newPassword: newpassword,
      });
      if (res.data) {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success("You have succesfully changed your password", {
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
    } catch (err) {
      toast.error("Error occured! please try again", {
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
  };

  useEffect(() => {
    if (confirmPassword !== newpassword) {
      setOldmismatcherror("Password doesn't match");
    } else {
      setOldmismatcherror("");
    }
  }, [confirmPassword]);

  return (
    <>
      <div className="border-2 py-2 px-2 mt-5 rounded-md">
        <h3 className="-mt-6 font-bold text-20">
          <span className=" bg-white px-3">General Information</span>
        </h3>

        <div className="mx-auto w-64 relative text-center mt-7 py-3">
          <img
            className="w-64 h-64 rounded-full border-4 border-MdBlue"
            src={`${profile.avatar}`}
            alt={profile.firstName}
          />

          <FileBase64
            multiple={false}
            onDone={({ base64 }) =>
              setProfile((prev) => {
                return {
                  ...prev,
                  avatar: base64,
                };
              })
            }
          />
          <h4 className="text-center text-18 font-bold mt-2">
            Profile Picture
          </h4>
        </div>

        <div className="w-full grid gap-6 mb-6 md:grid-cols-2 mt-5">
          <div>
            <label
              htmlfor="firstName"
              className="block mb-2 text-16 font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={profile.firstName}
              className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Victor"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label
              htmlfor="last_name"
              className="block mb-2 text-16 font-medium text-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              type="text"
              value={profile.lastName}
              id="last_name"
              name="lastName"
              className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label
              htmlfor="location"
              className="block mb-2 text-16 font-medium text-gray-900 dark:text-white"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={profile.residence}
              name="residence"
              className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Sunyani"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label
              htmlfor="school"
              className="block mb-2 text-16 font-medium text-gray-900 dark:text-white"
            >
              Recent school
            </label>
            <input
              type="text"
              id="school"
              value={profile.school}
              name="school"
              className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label
              htmlfor="phone"
              className="block mb-2 text-16 font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={profile.phone}
              name="phone"
              className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="+23376893432"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label
              htmlfor="email"
              className="block mb-2 text-16 font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={profile.email}
              name="email"
              className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@web.com"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <h4 className="font-bold text-MdBlue mt-10 text-18">
          What are your interest and what do you do at your leisure time
        </h4>

        <div className="W-full flex flex-col px-2 md:px-10">
          <div className="w-full md:w-10/12 self-center">
            <ReactTags
              tags={keyInterest}
              placeholder="Type your key interest "
              delimiters={delimiters}
              handleDelete={handleDelete2}
              handleAddition={handleAddition2}
              handleDrag={handleDrag2}
              handleTagClick={handleTagClick2}
              inputFieldPosition="bottom"
              autocomplete
              className="bg-red-400 text-blue-400"
            />
            <p>Press Enter or Comma to add new interest</p>
          </div>
        </div>

        <h4 className="font-bold text-MdBlue mt-10 text-18">
          Which Major(s) are you intending to pursue
        </h4>

        <div className="W-full flex flex-col px-2 md:px-10">
          <div className="w-full md:w-10/12 self-center">
            <ReactTags
              tags={intendedMajor}
              placeholder="Type in your intended major "
              delimiters={delimiters}
              handleDelete={handleDelete1}
              handleAddition={handleAddition1}
              handleDrag={handleDrag1}
              handleTagClick={handleTagClick1}
              inputFieldPosition="bottom"
              autocomplete
              className="bg-red-400 text-blue-400"
            />
            <p>Press Enter or Comma to add new interest</p>
          </div>
        </div>

        <div className="w-full md:w-7/12  py-1">
          <h4 className="font-bold text-MdBlue mt-10 text-18">
            Describe your passion and goals. (Bio)
          </h4>

          <TextareaAutosize
            minRows={10}
            className="w-full mt-5 text-18 resize-none border-2 p-3 rounded-md"
            placeholder="type your bio here"
            value={profile.bio}
            name="bio"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button
          className="py-1 px-3 bg-MdBlue font-bold text-white rounded-md outline-none active:bg-blue-900"
          onClick={updateWithoutPassword}
        >
          Save update
        </button>
      </div>

      <div className="border-2 py-2 px-2 mt-16 pb rounded-md">
        <h3 className="-mt-6 font-bold text-20">
          <span className=" bg-white px-3">Security</span>
        </h3>

        <div className="w-full grid gap-6 mb-6 md:grid-cols-2 mt-5">
          <div>
            <label
              htmlfor="oldPassword"
              className="block mb-2 text-16 font-medium text-gray-900 dark:text-white"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldpassword}
              className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="****************"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlfor="newPassword"
              className="block mb-2 text-16 font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newpassword}
              className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="****************"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlfor="confirmPassword"
              className="block text-16 font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="****************"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <p
            ref={oldpassref}
            className="font-bold text-18 text-red-600"
            aria-live="assertive"
          >
            {oldmismatcherror}
          </p>
        </div>

        <button
          className="py-1 px-3 bg-MdBlue font-bold text-white rounded-md outline-none active:bg-blue-900 disabled:bg-gray-200"
          disabled={!oldpassword || !newpassword || !confirmPassword}
          onClick={updateWithPassword}
        >
          Change Password
        </button>
      </div>

      {isLoading && (
        <CoverLoaderMedium
          styles={{ backgroundColor: "rgba(205,205,255,0.4)" }}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default EditProfile;
