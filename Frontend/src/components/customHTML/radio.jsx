import React from "react";
import { HiBadgeCheck } from "react-icons/hi";
import './style.css'

export function RadioWithIcon(props) {
  return (
    <div className={`customRadio cursor-pointer ${props.classextend}`}>

      <label htmlFor={props.id} className="radio">
        <input
          type="radio"
          value={props.value}
          id={props.id}
          name={props.name}
          {...props}
        />

        <div className="label flex flex-col justify-center items-center relative">
          <img src={props.imgSource} alt={props.text} />
          <p className="font-bold bg-white capitalize text-15 px-2">{props.text}</p>
          <div className="checked text-4xl rounded-full bg-white text-MdBlue absolute -top-3 -right-4">
            <HiBadgeCheck />
          </div>
        </div>

      </label>

    </div>
  )
}
