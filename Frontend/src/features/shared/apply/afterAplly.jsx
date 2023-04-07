import React from "react";
import Lottie from "lottie-react";
import SubmitCheack from "../../../assets/animations/submitCheckmark.json";
import { Link, useLocation } from "react-router-dom";

function AfterAplly() {
const location = useLocation()
console.log(location);

  return (
    <div
      className="submittedAlert px-3 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden"
      style={{ height: "100vh" }}
    >
      <Lottie
        animationData={SubmitCheack}
        loop={false}
        style={{ width: 200 }}
        autoplay={true}
      />
      <p className="text-2xl text-MdBlue500 font-bold text-center">
        Congratulations Asum! Your application has been successfully submitted.
      </p>
      <p className="w-full md:w-6/12 mt-5 text-center">
        Thank you for your interest in Ckodon. We appreciate your time and
        effort in completing the application. We will review your application
        carefully and get back to you as soon as possible.
      </p>

      <Link to="/welcome" className="mt-10 underline text-MdBlue font-bold">
        Read Ckodon articles
      </Link>
    </div>
  );
}

export default AfterAplly;
