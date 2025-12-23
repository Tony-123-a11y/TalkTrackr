import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useNavigate} from 'react-router-dom'
import logo from '@/assets/logo.png'
import { MdEmail, MdLock } from "react-icons/md"
import { loginUser } from "../../services/apiService"
import { toast } from "react-toastify"
import Loader from "./Loader"
import { useDispatch } from "react-redux"
import { login } from "../../Redux/UserSlice"
import GoogleLoginButton from "./GoogleLoginButton"

const LoginForm = ({setWhichForm}) => {
      const [showPassword, setShowPassword] = useState(false)
      const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const dispatch =useDispatch()
const navigate= useNavigate()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
try {
  setLoading(true)
  const res= await loginUser(email,password)
  console.log(res)
   toast.success('User Logged In  Sucessfully!')
   setLoading(false)
   dispatch(login(res.data.user))
   navigate('/profile')
   
} catch (error) {
     setLoading(false)  
     toast.error(error.response.data.msg)
}
  }
  return (
     <div className="bg-primary-background backdrop-blur-sm h-full  shadow-xl p-8 max-sm:p-5 max-md:p-6 max-sm:rounded-none rounded-r-4xl  w-2/5 max-md:w-1/2 max-sm:w-full">
          {/* Header */}
          <div className="text-center mb-6">
            <img src={logo} alt="" className="h-25 w-25 object-contain  mx-auto scale-110 " />
            <p className="text-gray-200">Welcome back! Please enter your details</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 relative">
            {/* Email Field */}
            <div className=" relative">
              <MdEmail className="text-gray-400 text-lg absolute left-5 top-1/2 -translate-y-1/2"/>
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
                <MdLock className="text-gray-400 text-lg absolute left-5 top-1/2 -translate-y-1/2"/>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-12 py-3 pr-12  text-gray-300 bg-black rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors outline-none"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a href="#" className="text-sm text-red-500 hover:text-red-600 transition-colors">
                forgot password ?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-red-500 relative hover:bg-red-600 text-white h-12 rounded-full cursor-pointer font-medium transition-colors"
            >
              {
                loading ? <Loader/> : <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Log In</span>
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
            <GoogleLoginButton setLoading={setLoading}/>
</div>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-sm text-gray-500">
              Don't have account?{" "}
              <button onClick={()=>setWhichForm('register')} className="text-red-500 cursor-pointer hover:text-red-600 font-medium transition-colors">
                Sign Up
              </button>
            </span>
          </div>
        </div>
  )
}

export default LoginForm
