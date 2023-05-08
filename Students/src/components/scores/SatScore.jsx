import React from "react";

function SatScore({ date, state, totalScore, EVBRW, Math }) {
  return (
    <div className="max-w-prose px-3 py-3 bg-slate-100 hover:bg-slate-200 flex flex-col shadow-md mt-10 border rounded-2xl">
      <h3 className="text-2xl font-bold">SAT</h3>

      <div className="flex mt-3 flex-row gap-3 flex-wrap">
        <h4 className="font-semibold">{date}</h4>
        <div className="w-1 py-1 bg-gray-300"></div>
        <h4 className="font-semibold text-MdBlue">{`${state=='Official'? 'Official test, College Board': 'Trial test score' }`}</h4>
      </div>
      <hr className="mt-1" />
      <div className="flex flex-col mt-5 flex-wrap">
        <h4 className="font-bold text-18">Total SAT Score</h4>
        <h4 className="text-7xl text-MdBlue">{totalScore}</h4>
      </div>
      <hr className="mt-1" />
      <div className="flex flex-row gap-3 mt-3 flex-wrap">
        <div className="flex flex-col">
          <h4 className="font-semibold">EVBRW Score</h4>
          <h4 className="text-3xl text-MdBlue">{EVBRW}</h4>
        </div>
        <div className="flex flex-col">
          <h4 className="font-semibold">Math Score</h4>
          <h4 className="text-3xl text-MdBlue">{Math}</h4>
        </div>
      </div>
    </div>
  );
}

export default SatScore;
