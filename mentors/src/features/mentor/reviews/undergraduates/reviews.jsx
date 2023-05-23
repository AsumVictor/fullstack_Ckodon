import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Page from "../../../../components/shared/page";
import { NormalInputs } from "../../../../components/customHTML/textInputs";
import { ButtonDefault } from "../../../../components/buttons";
import { HiOutlineSearch } from "react-icons/hi";
import { BiTime } from "react-icons/bi";
import {
  RefreshToolkit,
  CustomToolkit,
} from "../../../../components/toolkits/tollkit";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useGetReviewsQuery } from "../../../../apiSlice/reviewsApiSlice";
import NoContent from "../../../../components/indications/noContent";
import Review from "./review";
import { CoverLoaderMedium } from "../../../../components/loaders/loader";

function UndergraduateReviews() {
  //LOADING REVIEWS
  const {
    data: reviews,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetReviewsQuery();

  let content;
  if (isLoading) content = < CoverLoaderMedium />

  if (isError) {
    if (error?.status == 400) {
      content = <NoContent message={error?.data?.message} />;
    }
  }

  if (isSuccess) {
    const { ids } = reviews;
   
    const tableContent = ids?.length
      ? ids.map((reviewsId, index) => (
          <Review key={reviewsId} reviewId={reviewsId} index={index + 1} />
        ))
      : null;

    content = (
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  shadow-md rounded-md mt-10 overflow-x-auto overflow-y-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
          <tr>
            <th scope="col" className="px-6 py-3 tabel-hide">
              NO.
            </th>
            <th scope="col" className="px-6 py-3">
              Document type
            </th>
            <th scope="col" className="px-6 py-3 ">
              status
            </th>
            <th scope="col" className="px-6 py-3 tabel-hide">
              deadline
            </th>
            <th scope="col" className="px-6 py-3 tabel-hide">
              submitted by
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        {tableContent}
      </table>
    );
  }

  //Searvh According to types
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const statusFilter = searchParams.get("status");

  function FilterSearch(key, value) {
    setSearchParams((prevParams) => {
      if (value == null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  //Status

  return (
    <Page>
      <h1 className="text-center font-bold text-MdBlue text-20">
       Document from your mentees
      </h1>

      <div className="flex felx-row justify-between items-center w-full flex-wrap gap-y-2 mt-5 z-10 sticky top-0 bg-white py-2">
        <div className="flex flex-row justify-between items-center w-full gap-2 md:w-5/12">
          <NormalInputs
            type="text"
            name="search"
            placeholder="Search review by a student..."
          />
          <ButtonDefault>
            <HiOutlineSearch /> Search
          </ButtonDefault>
        </div>
        <div className="flex flex-row justify-between items-center gap-5 md:gap-3">
          <RefreshToolkit />
          <CustomToolkit
            content="Sort according to deadline"
            id="sortDeadline"
            icon={<BiTime />}
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

      <div className="w-full py-2 flex flex-row flex-wrap justify-between">
        <div
          className="w-full flex-wrap md:w-6/12 gap-2 mt-3 flex-row flex justify-center items-center"
          id="typeFilter"
        >
          <FilterButton
            text="honors"
            handleFilter={FilterSearch}
            type={"honors"}
            typeFilter={typeFilter}
          />

          <FilterButton
            text="activities"
            handleFilter={FilterSearch}
            type={"activities"}
            typeFilter={typeFilter}
          />
          <FilterButton
            text="essays"
            handleFilter={FilterSearch}
            type={"essays"}
            typeFilter={typeFilter}
          />
          <FilterButton
            text="aids"
            handleFilter={FilterSearch}
            type={"aids"}
            typeFilter={typeFilter}
          />

          <FilterButton
            text="recommendations"
            handleFilter={FilterSearch}
            type={"recommendations"}
            typeFilter={typeFilter}
          />
          <button
            className="text-red-500 underline"
            onClick={() => FilterSearch("type", null)}
          >
            Clear
          </button>
          <ReactTooltip
            anchorId="typeFilter"
            place="bottom"
            variant="info"
            content="Search according to document type"
            className="z-50 opacity-100"
          />
        </div>
        <div
          className="w-full flex-wrap md:w-4/12 gap-2 mt-3 flex-row flex justify-center items-center"
          id="statusFilter"
        >
          <StatusFilterButton
            handleFilter={FilterSearch}
            type="unresolved"
            typeFilter={statusFilter}
          />
          <StatusFilterButton
            handleFilter={FilterSearch}
            type="resolved"
            typeFilter={statusFilter}
          />

          <button
            className="text-blue-500 underline"
            onClick={() => FilterSearch("status", null)}
          >
            Clear
          </button>
          <ReactTooltip
            anchorId="statusFilter"
            place="bottom"
            variant="info"
            content="Search according to document status"
            className="z-50 opacity-100"
          />
        </div>
      </div>

      {content}
    </Page>
  );
}

export default UndergraduateReviews;

export function FilterButton(props) {
  return (
    <button
      onClick={() => props.handleFilter("type", `${props.type}`)}
      className={`py-1 mt-2 px-3 ${
        props.typeFilter == props.type ? "bg-red-100" : null
      } capitalize rounded-md font-semibold border-2 border-red-100`}
    >
      {props.text}
    </button>
  );
}

export function StatusFilterButton(props) {
  return (
    <button
      onClick={() => props.handleFilter("status", `${props.type}`)}
      className={`py-1 mt-2 px-3 ${
        props.typeFilter == "unresolved" && props.typeFilter == props.type
          ? "bg-blue-600 text-white"
          : props.typeFilter == "resolved" && props.typeFilter == props.type
          ? "bg-emerald-600 text-white"
          : null
      } capitalize rounded-md font-semibold border-2
      ${
        props.type == "unresolved"
          ? "border-blue-600"
          : props.type == "resolved"
          ? "border-emerald-600"
          : null
      } `}
    >
      {props.type}
    </button>
  );
}
