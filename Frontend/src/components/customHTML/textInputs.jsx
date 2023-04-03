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
    className={`form-group w-full border-2 relative ${props.classextend}`}
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


export function NormalInputs(props){
  return(
    <div className={`py-3 px-2 bg-white w-full overflow-hidden  h-10 rounded-md border-2 relative ${props.classextend}`}>
      <input type="text" className='absolute outline-none w-full h-full top-0 left-0 px-2 text-18' {...props}/>
    </div>
  )
}

