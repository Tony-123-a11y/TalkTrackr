import { useEffect } from "react";
import {apiClient} from '../../services/interceptor'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/UserSlice";
function GoogleLoginButton({setLoading}) {
 const dispatch=useDispatch()
 const navigate=useNavigate()
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "large" }
    );
  }, []);

  function handleCredentialResponse(response) {
    // send token to backend
    setLoading(true)
     apiClient.post('/users/googleLogin',{token:response.credential})
     .then((res)=> {
      dispatch(login(res.data.user))
        navigate('/profile')})
     .catch((error)=>console.log(error))
  }

  return <div id="google-btn" ></div>;
}

export default GoogleLoginButton;
