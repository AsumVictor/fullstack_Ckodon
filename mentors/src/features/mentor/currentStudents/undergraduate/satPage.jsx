import React, { useMemo } from "react";
import SatScore from "../../../../components/scores/SatScore";
import { useOutletContext, Link } from "react-router-dom/dist/umd/react-router-dom.development";
import { useGetUsersQuery, selectUserById } from "../../../../apiSlice/usersApiSlice";
import { useGetSatByUserQuery } from "../../../../apiSlice/satSlice";
import { useSelector } from "react-redux";
import { CoverLoaderMedium } from "../../../../components/loaders/loader";
import { configureStore } from "@reduxjs/toolkit";

function SatPage() {
    const context = useOutletContext()
    const studentId = context.studentId
    const student = useSelector((state) => selectUserById(state, studentId));
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
      } = useGetUsersQuery()
      const {
        data: sats,
        isLoading: satLoad,
        isSuccess: satSuccess,
        isError: satIsError,
        error: satError,
      } = useGetSatByUserQuery(studentId)
let content

if (satLoad) {
  return (
    < CoverLoaderMedium />
  )
}

if(!sats.length){
  content = (
   <h2 className="">
    This student has not submitted any SAT score
   </h2>
  )
}else{
  content = sats.map(sat=>{
    return (
<SatScore
date={sat.date}
state={sat.state}
totalScore={sat.totalScore}
EVBRW={sat.reading}
Math={sat.math}
/>
    )
  })
  
}

  return (
    <>
      <h2 className="font-bold px-2 md:px-5 text-18">
      {`${student?.firstName} ${student?.lastName}'s SAT test score(s)`}
      </h2>
<div className="flex flex-row justify-around flex-wrap py-10"></div>
{content}
     
    </>
  );
}

export default SatPage;
