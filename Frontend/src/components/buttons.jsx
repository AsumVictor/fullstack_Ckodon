import React from "react";

export function ButtonDefault(props) {
  return (
    <button
      className={`py-2 px-3 flex flex-row justify-center items-center bg-MdBlue text-white font-bold rounded-xl hover:bg-blue-800 ${props.classExtend}`}
      {...props}
      type={props.type}
      onClick={props.ClickAction}
    >
      {props.children}
    </button>
  );
}

export function ButtonOutline(props) {
  return (
    <button
      className={`py-2 border-2 border-MdBlue px-3 flex flex-row justify-center items-center bg-tranparent text-MdBlue font-bold rounded-xl hover:bg-MdBlue hover:text-white ${props.classExtend}`}
      onClick={props.ClickAction}
    >
      {props.children}
    </button>
  );
}
