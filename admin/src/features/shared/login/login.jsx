import React from "react";
import "./style.css";
import { RadioWithIcon } from "../../../components/customHTML/radio";
import { TextInputs } from "../../../components/customHTML/textInputs";

function Login() {
  return (
    <>
    <section className="section flex flex-col justify-center py-2 items-center w-full px-2">
      <form className="bg-white py-10 w-full md:w-96 flex flex-col items-center px-3 md:px-5">
        <h2 className="text-center text-MdBlue font-bold text-4xl">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 font-bold text-1xl">
          We're are excited to see again!
        </p>

        <img src="/images/adminLogo.png" alt="admin"  style={{height:"2cm",width:"2cm"}} className="mt-5 border-2 rounded-full p-2 border-MdBlue"/>

        <h4 className="capitalize font-bold text-18">
          admin
        </h4>

        {/* User role  */}
    

        <TextInputs
          id="email"
          required={true}
          name="email"
          label="email"
          type="email"
          classextend='mt-7'
        />

        <TextInputs
          id="password"
          required={true}
          name="password"
          label="password"
          type="password"
          classextend='mt-7'
        />

        <a href="#" className="text-MdBlue underline mt-2 self-start">
          Forgot Password
        </a>

        <button
          id="submit"
          className="w-full bg-MdBlue mt-4 text-xl flex justify-center items-center 
                        font-bold py-2 text-white relative
                        rounded-md hover:bg-MdBlue500"
        >
          Login
        </button>

        <p className="mt-10 ">
            Need an Account :
            <a to='/apply' className={`'text-gray-400 cursor-not-allowed': 'text-MdBlue '} font-extrabold underline ml-1`}
              // onClick={(e)=>  ? e.preventDefault(): null}
              >
              Apply
            </a>
          </p>

      </form>
    </section>
    </>
  );
}

export default Login;
