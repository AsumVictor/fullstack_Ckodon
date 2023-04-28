import React, { useState } from 'react';
import Page from "../../../components/shared/page";
import './tags.css'
import { WithContext as ReactTags } from 'react-tag-input';
import TextareaAutosize from 'react-textarea-autosize';


 const KeyCodes = {
     comma: 188,
     enter: 13
   };
   const delimiters = [KeyCodes.comma, KeyCodes.enter];

function EditProfile() {

      const [intendedMajor, setIntendedMajor] = useState([
        
      ]);
    
      const handleDelete1 = i => {
        setIntendedMajor(intendedMajor.filter((tag, index) => index !== i));
      };
    
      const handleAddition1 = tag => {
        setIntendedMajor([...intendedMajor, tag]);
      };
    
      const handleDrag1 = (tag, currPos, newPos) => {
        const newIntendedMajor = intendedMajor.slice();
    
        newIntendedMajor.splice(currPos, 1);
        newIntendedMajor.splice(newPos, 0, tag);
    
        // re-render
        setIntendedMajor(newIntendedMajor);
      };
    
      const handleTagClick1 = index => {
        console.log('The tag at index ' + index + ' was clicked');
        console.log(intendedMajor)
      };


      const [keyInterest, setKeyInterest] = useState([
        
      ]);
    
      const handleDelete2 = i => {
        setKeyInterest(keyInterest.filter((tag, index) => index !== i));
      };
    
      const handleAddition2 = tag => {
        setKeyInterest([...keyInterest, tag]);
      };
    
      const handleDrag2 = (tag, currPos, newPos) => {
        const newKeyInterest = keyInterest.slice();
    
        newKeyInterest.splice(currPos, 1);
        newKeyInterest.splice(newPos, 0, tag);
    
        // re-render
        setKeyInterest(newKeyInterest);
      };
    
      const handleTagClick2 = index => {
        console.log('The tag at index ' + index + ' was clicked');
        console.log(keyInterest)
      };

  return (
    <main className="overflow-y-auto pb-24">
      <h3 className="mt-5 font-bold text-20">General information</h3>

      <div className="mx-auto w-64 relative text-center mt-7 py-3">
        <img
          className="w-64 h-64 rounded-full absolute "
          src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
        />

        <label htmlFor="avater">
          <div className="w-64 h-64 group hover:bg-gray-600 bg-gray-200 opacity-60 rounded-full flex justify-center items-center cursor-pointer transition duration-500">
            <img
              className=" group-hover:block w-12"
              src="https://www.svgrepo.com/show/33565/upload.svg"
              alt=""
            />
          </div>
        </label>
        <input type="file" id="avater" className="absolute opacity-0" />
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
            className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
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
            id="last_name"
            className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
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
            className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>

        <div>
          <label
            htmlfor="last_name"
            className="block mb-2 text-16 font-medium text-gray-900 dark:text-white"
          >
            Recent school
          </label>
          <input
            type="text"
            id="last_name"
            className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
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
            className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
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
            className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>
      </div>

<h4 className="font-bold text-MdBlue mt-10 text-18"> What are your interest and what do you do at your leisure time </h4>

<div className="W-full flex flex-col px-2 md:px-10">
     
      <div className='w-full md:w-10/12 self-center'>
        <ReactTags
          tags={keyInterest}
          placeholder='Type your key interest '
          delimiters={delimiters}
          handleDelete={handleDelete2}
          handleAddition={handleAddition2}
          handleDrag={handleDrag2}
          handleTagClick={handleTagClick2}
          inputFieldPosition="bottom"
          autocomplete
          className='bg-red-400 text-blue-400'
        />
       <p>Press Enter or Comma to add new interest</p>
      </div>
    </div>

    <h4 className="font-bold text-MdBlue mt-10 text-18">Which Major(s) are you intending to pursue</h4>

<div className="W-full flex flex-col px-2 md:px-10">
     
      <div className='w-full md:w-10/12 self-center'>
        <ReactTags
          tags={intendedMajor}
          placeholder='Type in your intended major '
          delimiters={delimiters}
          handleDelete={handleDelete1}
          handleAddition={handleAddition1}
          handleDrag={handleDrag1}
          handleTagClick={handleTagClick1}
          inputFieldPosition="bottom"
          autocomplete
          className='bg-red-400 text-blue-400'
        />
       <p>Press Enter or Comma to add new interest</p>
      </div>
    </div>

<div className="w-full md:w-7/12  py-1">
<h4 className="font-bold text-MdBlue mt-10 text-18">Describe your passion and goals. (Bio)</h4>

 <TextareaAutosize minRows={10} className='w-full mt-5 text-18 resize-none border-2 p-3 rounded-md' placeholder='type your bio here'/> 

</div>
    </main>
  );
}

export default EditProfile;
