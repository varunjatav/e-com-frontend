import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = React.createContext();

export default function AuthContextProvider({ children }) {
  let token = localStorage.getItem("token");
  let signUpUser = JSON.parse(localStorage.getItem("sign_up_user"));

     console.log("token from auth context", token);
  const [currentUser, setCurrentUser] = useState(token);
  let [data, setData] = useState([]);
  const [pselect,setPselect] = useState(1);
  const [categ,setCateg] = useState("all");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState(false);
  const [authToken, setAuthToken] = useState(currentUser);
  // useEffect(() => {
  //   setCurrentUser(token);
  // }, [token]);

console.log("current user from app context: ", currentUser);
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
        localStorage.setItem("sign_up_user",JSON.stringify(res.data.user.firstName + " " +res.data.user.lastName)); 
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
      localStorage.setItem("token", response.data.token); // Save token to localStorage
      setAuthToken(response.data.token); // Update authToken state
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
    setAuthToken(null)
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
    // console.log(query);
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
  const addtocart = async (productId) => {
    
    let res = await fetch(`http://localhost:8000/cart/add`, {
      method: "POST",
      body: JSON.stringify({ _id: productId }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
      
    })
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    let responseData = await res.json(); // Parse the JSON response
    setStatus(!status); // Trigger re-fetch of cart items
  }

  // get total ammount
  function getTotal(data) {
    let totalam = 0;
    for (let i = 0; i < data.length; i++) {
      totalam += data[i].product.price;
    }
    setTotal(totalam);
    localStorage.setItem("totalAmount",totalam)
  }

 
  // get cart information
  useEffect(() => {
    async function getCart() {
      let res = await fetch("http://localhost:8000/cart/",{
        method: "GET",
          headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${authToken}`
          }
        
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      let data1 = await res.json();
      // console.log(data1);
      setDatas(data1.items);
      await getTotal(data1.items);
    }
    if(authToken){
      getCart();
    }
    
  }, [authToken, status]);


  const deleteCart = async (productId) => {
    console.log("delete function auth token: ",authToken);
    try {
      let res = await fetch(`http://localhost:8000/cart/delete/${productId}`, {
        method: "Delete",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
      }
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
      setStatus(!status);
    } catch (error) {
      console.error('Failed to delete cart item:', error);
    }
 
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
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
    addtocart,
    datas,
    total,
    deleteCart,
    authToken,
    setAuthToken
    //  emailverify
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
