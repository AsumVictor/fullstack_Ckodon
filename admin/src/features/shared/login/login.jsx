import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "./style.css";
import { TextInputs } from "../../../components/customHTML/textInputs";
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../auth/authSlice'
import { useLoginMutation } from '../../auth/authApiSlice'

function Login() {

  

      const errRef = useRef()
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [errMsg, setErrMsg] = useState('')
  
      const navigate = useNavigate()
      const dispatch = useDispatch()
  
      const [login, { isLoading }] = useLoginMutation()
  

  
      useEffect(() => {
          setErrMsg('');
      }, [email, password])
  
  
      const handleSubmit = async (e) => {
          e.preventDefault()
          try {
              const { accessToken } = await login({ role: 'admin', email, password }).unwrap()
              if (accessToken) {
                
                dispatch(setCredentials({ accessToken }))
                setEmail('')
                setPassword('')
                navigate('/dashboard')
              }
          } catch (err) {
              if (!err.status) {
                  setErrMsg('No Server Response');
              } else if (err.status === 400) {
                  setErrMsg('Missing Username or Password');
              } else if (err.status === 401) {
                  setErrMsg('Unauthorized');
              } else {
                  setErrMsg(err.data?.message);
              }
              errRef.current.focus();
          }
      }

  
      if (isLoading) return <p>Loading...</p>


  return (
    <>
    <section className="section flex flex-col justify-center py-2 items-center w-full px-2">
      <form className="bg-white py-10 w-full rounded-2xl md:w-96 flex flex-col items-center px-3 md:px-5" onSubmit={handleSubmit}>
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
        <p ref={errRef} className='font-bold text-18 text-red-600' aria-live="assertive">{errMsg}</p>

        <TextInputs
          id="email"
          required={true}
          name="email"
          label="email"
          type="email"
          classextend='mt-7'
          value={email}
          handlechange={(e)=>{
            setEmail(e.target.value)
          }}
        />

        <TextInputs
          id="password"
          required={true}
          name="password"
          label="password"
          type="password"
          classextend='mt-7'
          value={password}
          handlechange={(e)=>{
            setPassword(e.target.value)
          }}
        />

        <a href="#" className="text-MdBlue underline mt-2 self-start">
          Forgot Password
        </a>

        <button
          id="submit"
          className="w-full bg-MdBlue mt-4 text-xl flex justify-center items-center 
                        font-bold py-2 text-white relative
                        rounded-md hover:bg-MdBlue500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!email || !password}
        >
          Login
        </button>

        <p className="mt-10 ">
            I'm a student :
            <Link to='/apply' className={`'text-gray-400 cursor-not-allowed': 'text-MdBlue '} font-extrabold underline ml-1`}
              >
              in a wrong location
            </Link>
          </p>

      </form>
    </section>
    </>
  );
}

export default Login;
