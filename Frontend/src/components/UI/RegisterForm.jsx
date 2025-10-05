import { useState } from "react"
import { Link } from 'react-router-dom'
import logo from '@/assets/logo.png'
import { MdEmail, MdLock } from "react-icons/md"
import { registerUser } from "../../services/apiService"
import { toast } from "react-toastify"
import Loader from "./Loader"
import GoogleLoginButton from "./GoogleLoginButton"

const RegisterForm = ({ setWhichForm }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setfullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await registerUser(email, password, fullName)
      setLoading(false)
      toast.success('User Registered Sucessfully!')
      setWhichForm('login')
    } catch (error) {
      toast.dismiss()
      toast.error(error.response.data.msg)
      setLoading(false)
    }
  }
  return (
    <div className="bg-primary-background backdrop-blur-sm h-full shadow-xlp-8 max-sm:p-5 p-8 max-md:p-6 rounded-r-4xl max-sm:rounded-4xl w-2/5 max-md:w-1/2 max-sm:w-full ">
      {/* Header */}
      <div className="text-center mb-6">
        <img src={logo} alt="" className="h-25 w-25 object-contain  mx-auto scale-110 " />
        <p className="text-gray-200">Welcome! Please enter your details</p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-4 relative">
        {/* Email Field */}
        <div className=" relative">
          <MdEmail className="text-gray-400 text-lg absolute left-5 top-1/2 -translate-y-1/2" />
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            className="w-full px-12 py-3  text-gray-300 bg-black rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors outline-none"
            placeholder="Enter your Full Name"
            required
          />
        </div>
        {/* Full Name */}
        <div className=" relative">
          <MdEmail className="text-gray-400 text-lg absolute left-5 top-1/2 -translate-y-1/2" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-12 py-3  text-gray-300 bg-black rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors outline-none"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="">
          <div className="relative">
            <MdLock className="text-gray-400 text-lg absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              id="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-12 py-3 pr-12  text-gray-300 bg-black rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors outline-none"
              placeholder="Enter your password"
              required
            />

          </div>
        </div>



        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-red-500 relative hover:bg-red-600 text-white h-12 rounded-full cursor-pointer font-medium transition-colors"
        >
          {
            loading ? <Loader /> : 'Sign Up'
          }

        </button>
      </form>

      {/* Divider */}
      <div className="my-8 flex items-center">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-sm text-gray-500">Or Continue With</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Social Login Buttons */}
       <div className=" items-center justify-center gap-4 mb-5 border max-w-50 mx-auto rounded-4xl overflow-hidden">
            <GoogleLoginButton/>
</div>
      {/* Sign Up Link */}
      <div className="text-center ">
        <span className="text-sm text-gray-500">
          Already Have an Account?{" "}
          <button onClick={() => setWhichForm('login')} className="text-red-500 cursor-pointer hover:text-red-600 font-medium transition-colors">
            Login
          </button>
        </span>
      </div>
    </div>
  )
}

export default RegisterForm
