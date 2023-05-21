import React from "react";
import { HiArrowPath} from "react-icons/hi2";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

export function RefreshToolkit(props) {
  return (
    <>
      <div
        id="refresh"
        className={`w-10 cursor-pointer h-10 flex items-center justify-center shadow-md rounded-2xl ${props.class}`}
      >
        <div className="text-2xl">
          <HiArrowPath />
        </div>
      </div>
      <ReactTooltip
        anchorId="refresh"
        place="bottom"
        variant="info"
        content="Refresh"
      />
    </>
  );
}


export function CustomToolkit(props) {
    return (
      <>
        <div
          id={props.id}
          className="w-10 cursor-pointer h-10 flex items-center justify-center shadow-md rounded-2xl"
        >
          <div className="text-2xl">
            {props.icon}
          </div>
        </div>
        <ReactTooltip
          anchorId={props.id}
          place="bottom"
          variant="info"
          content={props.content}
        />
      </>
    );
  }
  
  

