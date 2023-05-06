import React from 'react';
import Lottie from "lottie-react";
import NoContentAnimate from "../../assets/animations/no file.json";

export default function NoContent(props){
    return(
        <div className="mt-10 w-full flex flex-col justify-center items-center">
        <div className="animation-box">
          <Lottie
            animationData={NoContentAnimate}
            loop={false}
            style={{ width: "250px" }}
          />
        </div>

        <h1 className="font-bold text-18 md:text-2xl text-center -mt-10 capitalize flex justify-center">
         {props.message}
        </h1>
      </div>
    )
}