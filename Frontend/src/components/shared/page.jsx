import React from 'react'

function Page(props) {
  return (
    <div className='page relative px-3 py-5 md:px-10'>
     {props.children}
    </div>
  )
}

export default Page