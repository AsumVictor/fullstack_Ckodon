import React from 'react'
import './style.css'

export function TextInputs(props) {


  function FocusInput(event) {
    return event.target.parentNode.classList.add("active");
  }
  function BlurInput(event) {
    if (event.target.value == "") {
      return event.target.parentNode.classList.remove("active");
    }
  }

  return (
    <div
    className={`form-group w-full border-2 relative ${props.classExtend}`}
  >

    <label htmlFor={props.id} className='capitalize'>
      {props.label} <span className="required"> {props.required && '*'}</span>
    </label>
    <input
      id={props.id}
      {...props}  
      onFocus={FocusInput}
      onBlur={BlurInput}
      required={props.required}
      className='w-full absolute top-0 left-0 bg-transparent h-full outline-none px-3'
    />
  </div>
  
  )
}


