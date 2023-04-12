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

        <h4 className=" mt-5">
          <span className="bg-white px-2 font-bold">I'm signing in as</span>
          <span className="required bg-white pr-2">*</span>
        </h4>

        {/* User role  */}
        <div className="flex mt-2 flex-auto flex-wrap gap-4 justify-center items-center">
          <RadioWithIcon
            id="admin"
            value={"admin"}
            name="role"
            text="admin"
            imgSource="/images/adminLogo.png"
          />
          <RadioWithIcon
            id="undergraduate"
            value={"undergraduate"}
            name="role"
            text="undergrad"
            imgSource="/images/studentLogo.png"
          />
          <RadioWithIcon
            id="graduate"
            value={"graduate"}
            name="role"
            text="graduate"
            imgSource="/images/studentLogo.png"
          />
        </div>

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
