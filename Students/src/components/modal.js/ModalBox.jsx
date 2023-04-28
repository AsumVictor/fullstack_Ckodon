import React from "react";

function ModalBox({modalHeader, children}) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto py-10 fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto mx-2 md:mx-auto max-w-xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between px-5 py-2 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-20 md:text-2xl text-MdBlue font-semibold">
               {modalHeader}
              </h3>

            </div>
           
{children}
            

          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ModalBox;

export function ModalBody(props){
return (
            <div className="relative px-3 flex-auto py-2">
              {props.children}
            </div>
)
}

export function ModalFooter(props){
    return (
        <div className={`flex ${props.class} border-t border-solid border-slate-200 rounded-b`}>
              {props.children}
            </div>
    )
}