import React, { useEffect, useState } from 'react'
import Styles from "./UserList.module.css";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

const UserList = () => {
  const [ userList, setUserList ] = useState([]);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getUser = async() => {
      try {
        const res = await fetch("http://localhost:8000/auth/users");
        const users = await res.json();
        console.log(users);
        
        setUserList(users)
      } catch (error) {
        console.log("error in getUser: ", error);
      }
    }
getUser()
  },[]);

  const searchUsers = async() => {
    let res;
    if(userName === ""){
       res = await fetch("http://localhost:8000/auth/users");
    }else{
      res = await fetch(`http://localhost:8000/auth/users/q?userName=${userName}`);
    }
    let users = await res.json();
    if (!Array.isArray(users)) {
      users = [users]; // Ensure users is an array
    }
    console.log(users);
    setUserList(users)
  }
  return (
    <div className={Styles.mainContainer}>
      <h1>User List</h1>
      <div className={Styles.searchDiv}>
        <input type="text" placeholder="Search Users" className={Styles.searchInput}onChange={(e) => setUserName(e.target.value)} />
        <button className={Styles.searchButton} onClick={searchUsers}><IoSearch /></button>
      </div>
      <table className={Styles.table}>
        <tr>
          <th>Full Name</th>
         
          <th>Email</th>
          <th>Mobile Number</th>
          <th>Role</th>
          <th>Remove</th>
        </tr>

        { userList.map((user, i) => {
          return (
            <tr key={i}>  
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.role}</td>
              <td>
                <button>
                  <MdDelete />
                </button>
              </td>
            </tr>
          );
        })}
        
      </table>
    </div>
  )
}

export default UserList