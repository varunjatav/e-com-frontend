import React from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import axios from "axios";

export const AuthContext = React.createContext();

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState({});

  async function Signup(mobileNumber, email, firstName, lastName, password) {
    /*return createUserWithEmailAndPassword(auth,email,password)*/
    try {
      const res = await axios.post("http://localhost:8000/auth/signup", {
        mobileNumber,
        email,
        firstName,
        lastName,
        password,
      });
      setCurrentUser(res);
      console.log(res);
    //   localStorage.setItem("token", res.data.user); // Save token to localStorage
    } catch (error) {
      console.log(error);
    }
  }

  async function Login(email, password) {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      setCurrentUser(response.data);
      localStorage.setItem("token", response.data.token); // Save token to localStorage
    } catch (error) {
      console.error(error);
    }
  }

  function updateprofilename(name) {
    return updateProfile(auth.currentUser, { displayName: name });
  }

  async function sendpassreset(email, oldpassword, newpassword, cnewpassword) {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/send-password-reset",
        { email, oldpassword, newpassword, cnewpassword }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  // function emailverify(){
  //     sendEmailVerification(auth.currentUser)
  //     .then(()=>{
  //           alert("Verify your Email Id , a mail sent to your email")
  //     })
  //     .catch((err)=>{
  //         const errrrr = err;
  //     })
  // }

  async function Logout() {

    localStorage.removeItem("token");
    refreshPage();
  }
  function refreshPage() {
    window.location.reload(false);
  }




  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    Signup,
    Login,
    Logout,
    updateprofilename,
    sendpassreset,
    //  emailverify
    
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
