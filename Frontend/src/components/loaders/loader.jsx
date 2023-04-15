import React from "react";
import "./style.css";
export function BigLoader() {
  return <div className="custom-loader lg"></div>;
}

export function MediumLoader() {
  return <div className="custom-loader md"></div>;
}

export function SmallLoader() {
  return <div className="custom-loader sm"></div>;
}

export function CoverLoaderBig() {
  return (
    <div className="justify-center bg-gray-800 opacity-70 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <BigLoader />
    </div>
  );
}

export function CoverLoaderMedium() {
  return (
    <div className="justify-center bg-white opacity-100 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <MediumLoader />
    </div>
  );
}
