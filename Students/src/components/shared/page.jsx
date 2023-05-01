import React from 'react'
function Page(props) {
  return (
    <div className='page pb-20 relative h-full flex overflow-y-scrool flex-col px-3 py-5 md:px-10'>
     {props.children}
    </div>
  )
}

export default Page