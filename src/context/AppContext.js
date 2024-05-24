import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = React.createContext();

export default function AuthContextProvider({ children }) {
  //
  let token = localStorage.getItem("token");
  let signUpUser = JSON.parse(localStorage.getItem("sign_up_user"));
     console.log("token from auth context", token);
  const [currentUser, setCurrentUser] = useState(() => token || null);
  let [data, setData] = useState([]);
  const [pselect,setPselect] = useState(1);
  const [categ,setCateg] = useState("all");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(token);
  }, [currentUser]);


  // signup function
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

      if(res.status >= 400 && res.status <=499){
        setCurrentUser(null);
        // console.log(res.data);
      }else{
        // setCurrentUser(res.data.token);
        console.log(res.data.user);
        localStorage.setItem("sign_up_user",JSON.stringify(res.data.user)); // Save token to localStorage
      }
     
    } catch (error) {
      console.log(error);
    }
  }


  // login function
  async function Login(email, password) {
    try {
      // console.log(email, password);
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });
      
      setCurrentUser(response.data.token);
     
      localStorage.setItem("token", response.data.token); // Save token to localStorage
    } catch (error) {
      console.error(error);
    }
   
  }
 

  // not working now (not needed)
  function updateprofilename(name) {
    return updateProfile(auth.currentUser, { displayName: name });
  }

  // password reset function
  async function sendpassreset(email, oldpassword, newpassword, cnewpassword) {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/send-password-reset",
        { email, oldpassword, newpassword, cnewpassword }
      );
      
    } catch (error) {
      console.error(error);
    }
  }

// logout function

  async function Logout() {
    localStorage.removeItem("token");
    setCurrentUser(null);
    
  }


// fetching data
  const getData = async (category) => {
    let resp;
    if (category === "all" || category === "ready" || category === "gifts" || category === "findstore") {
      resp = await fetch(`http://localhost:8000/jwellery`);
    } else {
      resp = await fetch(`http://localhost:8000/jwellery/q/cat?category=${category}`);
    }
    let apiData = await resp.json();
    setData(apiData)
  }


  // sorting data

  async function sorrtbygte(gte,lte ,category){
    if(gte===0){
      setPselect(1)
    }else if(gte===5000){
      setPselect(2) 
    }else if(gte===10000){
      setPselect(3)
    }else if(gte===20000){
      setPselect(4)
    }else if(gte===30000){
      setPselect(5) 
    }else if(gte===40000){
      setPselect(6)
    }
  
  
    let resp;
    if (category === "all" || category === "ready" || category === "gifts" || category === "findstore") {
      resp = await fetch(`http://localhost:8000/jwellery/q/price?price_gte=${gte}&price_lte=${lte}`);
      setCateg("all")
    } else {
      resp = await fetch(`http://localhost:8000/jwellery/q?category=${category}&price_gte=${gte}&price_lte=${lte}`);
    }
    let apiData = await resp.json();
    setData(apiData)
  
  }

  async function changeCateg(switchcateg){
    navigate(`/newarrival/${switchcateg}`); 
  }

  // search data
  const searchData = async() => {
    console.log(query);
    let resp;
    if (query === "") {
       resp = await fetch(`http://localhost:8000/jwellery`);
    } else {
       resp = await fetch(`http://localhost:8000/jwellery/q/cat?category=${query}`);
       changeCateg(query);
    }

    let apiData = await resp.json();
    setData(apiData);
    setQuery("");
  }

// add to cart not working now (needed)
  const addtocart = async () => {
    
    let res = await fetch(`http://localhost:8000/cart/add`, {
      method: "POST",
      body: JSON.stringify({ ...data }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser}`
      }
      
    })
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    let responseData = await res.json(); // Parse the JSON response
    console.log(responseData);
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
    getData,
    data,
    sorrtbygte,
    setPselect,
    setCateg,
    pselect,
    categ,
    setQuery,
    query,
    searchData,
    changeCateg,
    addtocart
    //  emailverify
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
