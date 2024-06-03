import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = React.createContext();

export default function AuthContextProvider({ children }) {
  let token = localStorage.getItem("token");
  let user_role = localStorage.getItem("userRole");
  const [currentUser, setCurrentUser] = useState(token);
  let [data, setData] = useState([]);
  const [pselect, setPselect] = useState(1);
  const [categ, setCateg] = useState("all");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState(false);
  let [authToken, setAuthToken] = useState(currentUser);
  const [wishListData, setWishListData] = useState([]);
  const [userRole , setUserRole] = useState(user_role);
  console.log("userRole from App Context: ",userRole);
  // console.log("authToken from app context: ", authToken);

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, [status]);
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
          localStorage.setItem("userRole", response.data.userRole);
          localStorage.setItem("token", response.data.token); // Save token to localStorage
          localStorage.setItem("refreshToken", response.data.refreshToken);// Save refresh token to localStorage
          // setStatus(!status);
          setAuthToken(response.data.token); // Update authToken state
          setUserRole(response.data.userRole);
        } catch (error) {
          console.error(error);
        }
      }

      


    // refresh token 
    async function RefreshToken() {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("http://localhost:8000/auth/refresh-token", {
          refreshToken,
        });
        
        // Update the access token in local storage
        localStorage.setItem("token", response.data.token);
        
        // Set the new access token as the default authorization header for Axios
        setAuthToken(response.data.token); 
    
        return response.data.token;
    
      } catch (error) {
        console.error('Error refreshing token:', error);
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
    localStorage.removeItem("refreshToken");
    setCurrentUser(null);
    setAuthToken(null);
    setDatas([]); // Clear cart items
    setTotal(0); // Reset total amount
    setWishListData([]);
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("userRole")
  }

  // fetching data
  const getData = async (category) => {
    let resp;
    if (
      category === "all" ||
      category === "ready" ||
      category === "gifts" ||
      category === "findstore"
    ) {
      resp = await fetch(`http://localhost:8000/products`);
    } else {
      resp = await fetch(
        `http://localhost:8000/products/q/cat?category=${category}`
      );
    }
    let apiData = await resp.json();
    setData(apiData);
  };

  // sorting data

  async function sorrtbygte(gte, lte, category) {
    if (gte === 0) {
      setPselect(1);
    } else if (gte === 5000) {
      setPselect(2);
    } else if (gte === 10000) {
      setPselect(3);
    } else if (gte === 20000) {
      setPselect(4);
    } else if (gte === 30000) {
      setPselect(5);
    } else if (gte === 40000) {
      setPselect(6);
    }

    let resp;
    if (
      category === "all" ||
      category === "ready" ||
      category === "gifts" ||
      category === "findstore"
    ) {
      resp = await fetch(
        `http://localhost:8000/products/q/price?price_gte=${gte}&price_lte=${lte}`
      );
      setCateg("all");
    } else {
      resp = await fetch(
        `http://localhost:8000/products/q?category=${category}&price_gte=${gte}&price_lte=${lte}`
      );
    }
    let apiData = await resp.json();
    setData(apiData);
  }

  async function changeCateg(switchcateg) {
    navigate(`/newarrival/${switchcateg}`);
  }

  // search data
  const searchData = async () => {
    // console.log(query);
    let resp;
    if (query === "") {
      resp = await fetch(`http://localhost:8000/products`);
    } else {
      resp = await fetch(
        `http://localhost:8000/products/q/cat?category=${query}`
      );
      changeCateg(query);
    }

    let apiData = await resp.json();
    setData(apiData);
    setQuery("");
  };

  // add to cart not working now (needed)
  const addtocart = async (productId) => {
    if(!authToken){
      authToken = await RefreshToken(); // refresh token
    }
    try {
      let res = await fetch(`http://localhost:8000/cart/add`, {
        method: "POST",
        body: JSON.stringify({ _id: productId }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      let responseData = await res.json(); // Parse the JSON response
      setStatus(!status);
    } catch (error) {
       console.error("error from add to cart app context: ", error.message);
    }
 // Trigger re-fetch of cart items
  };

  // get total ammount
  function getTotal(data) {
    let totalam = 0;
    for (let i = 0; i < data.length; i++) {
      totalam += data[i].product.price * data[i].quantity;
    }
    setTotal(totalam);
    localStorage.setItem("totalAmount", totalam);
  }

  useEffect(() => {
    async function getCart() {
      if(!authToken){
        authToken = await RefreshToken(); // refresh token
      }
      let res = await fetch("http://localhost:8000/cart/", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      let data1 = await res.json();
      // console.log(data1);
      setDatas(data1.items);
      await getTotal(data1.items);
    }
    if (authToken) {
      getCart();
    }
  }, [authToken, status]);

  const deleteCart = async (productId) => {
    try {
      if(!authToken){
        authToken = await RefreshToken(); // refresh token
      }
      let res = await fetch(`http://localhost:8000/cart/delete/${productId}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      setStatus(!status);
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  const decrementCart = async (productId) => {
    try {
      if(!authToken){
        authToken = await RefreshToken(); // refresh token
      }
      let res = await fetch(
        `http://localhost:8000/cart/decrement/${productId}`,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      setStatus(!status);
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  // add to wishlist
  const addtowishlist = async (productId) => {
    try {
      if(!authToken){
        authToken = await RefreshToken(); // refresh token
      }
      let res = await fetch(`http://localhost:8000/wishlist/add`, {
        method: "POST",
        body: JSON.stringify({ _id: productId }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": ` Bearer ${authToken}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const data = await res.json();
      // console.log(data);
      setStatus(!status); // Trigger re-fetch of cart items
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  // get wishlist data
  useEffect(() => {
  async function getWishList() {
    try {
      if(!authToken){
        authToken = await RefreshToken(); // refresh token
      }
      let res = await fetch("http://localhost:8000/wishlist/", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });
      // Check if the response is not ok
      if (!res.ok) {
        if (res.status === 404) {
          console.log("Wishlist not found");
          setWishListData([]); // Set to an empty array if wishlist is not found
          return;
        } else {
          throw new Error(`Error: ${res.statusText}`);
        }
      }

      let data = await res.json();
      console.log("wish list data from app context: ", data);
      setWishListData(data.items);
    } catch (error) {
      console.log("Error in fetching wishlist data: " + error);
    }
  }
  if (authToken) {
    getWishList();
  }
}, [authToken, status]);
  // delete from wishlist
  const deleteWishlist = async (id) => {
    try {
      if(!authToken){
        authToken = await RefreshToken(); // refresh token
      }
      let res = await fetch(`http://localhost:8000/wishlist/delete/${id}`, {
        method: "Delete",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      setStatus(!status);
    } catch (error) {
      console.log("error deleting from wishlist: " + error.message);
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
    setAuthToken,
    decrementCart,
    addtowishlist,
    deleteWishlist,
    wishListData,
    userRole,
    setUserRole,
    status
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
