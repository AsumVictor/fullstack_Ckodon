
import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import construction from "../assets/animations/construction.json";


export default function Construction(){
    return (
        <main className="flex items-center flex-col justify-center pb-20">
          <div
            className="animation-box w-full flex justify-center
                          md:w-9/12"
          >
            <Lottie animationData={construction} loop={true} style={{ width: 500 }} />
          </div>
    
          <h1 className="font-bold text-3xl md:-mt-10 md:text-4xl text-center capitalize text-MdBlue">
            Page under construction
          </h1>

          <h1 className="font-bold text-2xl md:text-3xl text-center capitalize">
            exercise patience
          </h1>
        </main>
      )
    
}

