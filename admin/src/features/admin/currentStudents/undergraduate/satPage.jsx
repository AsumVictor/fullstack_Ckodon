import React, { useMemo } from "react";
import SatScore from "../../../../components/scores/SatScore";
import { useOutletContext, Link } from "react-router-dom/dist/umd/react-router-dom.development";
import { useGetUsersQuery } from "../../../../apiSlice/usersApiSlice";
import { selectUserById } from "../../../../apiSlice/usersApiSlice";
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
console.log(student)




  return (
    <>
      <h2 className="font-bold px-2 md:px-5 text-18">
      {`${student?.firstName} ${student?.lastName}'s SAT test score(s)`}
      </h2>

<SatScore />
     
    </>
  );
}

export default SatPage;
