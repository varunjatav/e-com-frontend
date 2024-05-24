import React, { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const PrivateRoute = ({children}) => {
const {currentUser} = useContext(AppContext);
const navigate = useNavigate()

React.useEffect(()=>{
  

  if(currentUser === null){
       return navigate("/login")
    }
},[])

  return children;
}

export default PrivateRoute;