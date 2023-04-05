import React from "react";
import Page from "../../../../components/shared/page";
import { NormalInputs } from "../../../../components/customHTML/textInputs";
import { ButtonDefault } from "../../../../components/buttons";
import { HiOutlineSearch } from "react-icons/hi";
import { HiBarsArrowUp, HiBarsArrowDown } from "react-icons/hi2";
import {
  RefreshToolkit,
  CustomToolkit,
} from "../../../../components/toolkits/tollkit";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./style.css";
import { Link } from "react-router-dom";
import Applicant from "./applicant";
import { useGetUndergraduateApplicantsQuery } from "../../../../apiSlice/undergrauteApplicantsApiSlice";
import NoContent from "../../../../components/indications/noContent";

function AllApplicants() {
  const {
    data: applicants,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUndergraduateApplicantsQuery();
  let content;
  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
     if(error?.status == 400){
       content = <NoContent message={error?.data?.message} />
     }
    
  }


  if (isSuccess) {
    const { ids } = applicants;

    const tableContent = ids?.length
      ? ids.map((applicantsId, index) => <Applicant key={applicantsId} applicantId={applicantsId} index={index + 1}/>)
      : null

    content = (
        <table className="w-full text-sm text-left text-gray-500 mt-14 dark:text-gray-400 shadow-md rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3 tabel-hide">
                NO.
              </th>
              <th scope="col" className="px-6 py-3">
                Student name
              </th>
              <th scope="col" className="px-6 py-3 tabel-hide">
                school
              </th>
              <th scope="col" className="px-6 py-3 tabel-hide">
                location
              </th>
              <th scope="col" className="px-6 py-3 tabel-hide">
                application status
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          {tableContent}
        </table>
    );
  }

  return (
    <Page>
      <h1 className="text-center font-bold text-MdBlue text-18">
        All enrolled undergraduate Applicants
      </h1>

      <div className="flex felx-row justify-between items-center w-full flex-wrap gap-y-2 mt-5 sticky top-0">
        <div className="flex flex-row justify-between items-center w-full gap-2 md:w-5/12">
          <NormalInputs
            type="text"
            name="search"
            placeholder="Search student by name..."
          />
          <ButtonDefault>
            <HiOutlineSearch /> Search
          </ButtonDefault>
        </div>
        <div className="flex flex-row justify-between items-center gap-5 md:gap-3">
          <RefreshToolkit />
          <CustomToolkit
            content="Sort Ascending Order"
            id="sortAscending"
            icon={<HiBarsArrowUp />}
          />
          <CustomToolkit
            content="Sort Descending Order"
            id="sortDescending"
            icon={<HiBarsArrowDown />}
          />
          <button
            id="clear"
            className="px-2 py-1 bg-blue-900 font-bold rounded-md text-white"
          >
            Clear
          </button>
          <ReactTooltip
            anchorId="clear"
            place="bottom"
            variant="info"
            content="Clear filters"
          />
        </div>
      </div>

      {content}
    </Page>
  );
}

export default AllApplicants;
