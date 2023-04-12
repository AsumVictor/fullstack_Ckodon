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

  const inputBlur = document.querySelector('.inputBlur')


  return (
    <div
    className={`form-group w-full border-2 relative ${props.value !== '' ? 'active' : null}  ${props.classextend}`}
  >

    <label htmlFor={props.id} className='capitalize'>
      {props.label} <span className="required"> {props.required && '*'}</span>
    </label>
    <input
      id={props.id}
      {...props}  
      value={props.value}
      onFocus={FocusInput}
      onBlur={BlurInput}
      onChange={props.handlechange}
      required={props.required}
      className={`inputBlur w-full absolute top-0 left-0 bg-transparent h-full outline-none px-3`}
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

export function NormalTextArea(props){
  return(
    <div className={`px-2 bg-white w-full rounded-md border-2 border-red-500 relative ${props.classextend}`}>
      <textArea  
      className='outline-none w-full top-0 left-0 px-2 text-18'

      />

    </div>
  )
}


