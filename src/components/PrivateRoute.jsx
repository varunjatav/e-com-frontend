import React, { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const PrivateRoute = ({children}) => {
  let token = localStorage.getItem("token");
const {currentUser} = useContext(AppContext);
const navigate = useNavigate()

React.useEffect(()=>{
  

  if(token === null){
       return navigate("/login")
    }
},[])

  return children;
}

export default PrivateRoute;