import React from "react";
import { auth } from "../firebase"
import { onAuthStateChanged,updateProfile } from "firebase/auth"
import axios from "axios";


export const AuthContext = React.createContext()

export default function AuthContextProvider({children}){
 const [currentUser , setCurrentUser] = React.useState({});



async function Signup( mobileNumber, email, firstName, lastName,password){
    /*return createUserWithEmailAndPassword(auth,email,password)*/
    try {
        const res = await axios.post('http://localhost:8000/auth/signup', {
            mobileNumber, email, firstName, lastName, password
        });
        setCurrentUser(res)
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

async function Login(email, password) {
    try {
      const response = await axios.post('http://localhost:8000/auth/login', { email, password });
      setCurrentUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }

function updateprofilename(name){
    return updateProfile(auth.currentUser,{displayName : name})
}

async function sendpassreset(email, oldpassword, newpassword, cnewpassword){
    try {
        const response =  await axios.post('http://localhost:8000/auth/send-password-reset', {email, oldpassword, newpassword, cnewpassword});
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

async function Logout(){

try {
    const res = await axios.post('http://localhost:8000/auth/logout',{}, {
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        }});
        setCurrentUser(null);
    console.log(res.data);
} catch (error) {
    console.log(error);
}
}



React.useEffect(()=>{

    const unsubscribe = onAuthStateChanged(auth,user => {
        setCurrentUser(user)
    })

    return unsubscribe;
},[])

    const value = {
     currentUser,
     Signup,
     Login,
     Logout,
     updateprofilename,
     sendpassreset,
    //  emailverify
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}