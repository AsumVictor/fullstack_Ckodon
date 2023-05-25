import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { selectUndergraduateApplicantById } from "../../../../apiSlice/undergrauteApplicantsApiSlice";
import { Link } from "react-router-dom";

const Applicant = ({ applicantId, index }) => {
  const applicant = useSelector((state) =>
    selectUndergraduateApplicantById(state, applicantId)
  );

  if (applicant) {
    const applicantTrContent = (
      <tr className="bg-white cursor-pointer border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4 tabel-hide">{index}</td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {`${applicant.firstName} ${applicant.lastName}`}
        </th>
        <td className="px-6 py-4 tabel-hide">{applicant.recentSchool}</td>
        <td className="px-6 py-4 tabel-hide">{applicant.residence}</td>
        <td
          className={`px-6 py-4 capitalize ${
            applicant.applicationStatus == "pending"
              ? "text-blue-600"
              : applicant.applicationStatus == "admitted"
              ? "text-emerald-500"
              : "text-pink-500"
          }`}
        >{`${
          applicant.applicationStatus == "pending"
            ? "not reviewed"
            : applicant.applicationStatus
        }`}</td>
        <td className="px-6 py-4 text-right">
          <Link
            to={`${applicantId}`}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Open Files
          </Link>
        </td>
      </tr>
    );

    return applicantTrContent;
  }
};
export default Applicant;
