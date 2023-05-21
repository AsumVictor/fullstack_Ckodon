import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Notfound from "../../assets/animations/Not found.json";

export default function ErrorPage() {
  return (
    <main id="Error-main" className="flex items-center flex-col justify-center">
      <div
        className="animation-box w-full flex justify-center
                      md:w-9/12"
      >
        <Lottie animationData={Notfound} loop={true} style={{ width: 500 }} />
      </div>

      <h1 className="font-bold text-3xl md:text-4xl text-center">
        Page Not Found
      </h1>
      <Link to="/">
        <h2 className="font-bold text-MdBlue"> Return to Home page</h2>
      </Link>
    </main>
  );
}
