import React from "react";
import Page from "../../../components/shared/page";
import { NormalInputs } from "../../../components/customHTML/textInputs";
import { ButtonDefault } from "../../../components/buttons";
import { HiOutlineSearch } from "react-icons/hi";
import { HiBarsArrowUp, HiBarsArrowDown } from "react-icons/hi2";
import {
  RefreshToolkit,
  CustomToolkit,
} from "../../../components/toolkits/tollkit";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

function AllStudent() {
  return (
    <Page>
      <h1 className="text-center font-bold text-MdBlue text-18">
        All enrolled undergraduate students
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
    </Page>
  );
}

export default AllStudent;
