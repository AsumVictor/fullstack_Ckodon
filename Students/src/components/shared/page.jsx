import React from 'react'
function Page(props) {
  return (
    <div className='page pb-28 relative h-full flex overflow-y-scrool flex-col px-1 py-5 md:px-10'>
     {props.children}
    </div>
  )
}

export default Page