import React, { useContext, useState } from "react";
import styles from "./forgot.module.css";
import { useRef } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AppContext } from "../../context/AppContext";

const Forgot = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showcNewPassword, setShowcNewPassword] = useState(false);
    const [error, setError] = useState(false);
  const emailRef = useRef(null);
  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const cnewPasswordRef = useRef(null);
  const { sendpassreset } = useContext(AppContext);
  const navigate = useNavigate();

  const getformdata = async (event) => {
    event.preventDefault();
    try {
        if(newPasswordRef.current.value === cnewPasswordRef.current.value) {
            setError(false);
            await sendpassreset(
                emailRef.current.value,
                oldPasswordRef.current.value,
                newPasswordRef.current.value,
                cnewPasswordRef.current.value
              );
              navigate("/login");
        }else{
            setError(true);
        }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: "#f9f9fa",
          paddingBottom: "2rem",
        }}
      >
        <form action="" onSubmit={getformdata}>
          <div className={styles.main}>
            <div>
              <h3 style={{ marginTop: "2rem", marginLeft: "7rem" }}>
                Change your Password
              </h3>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <div style={{ textAlign: "left", paddingLeft: "2rem" }}>
                 Email
              </div>
              <input
                ref={emailRef}
                style={{
                  marginLeft: "0rem",
                  marginTop: "0.5rem",
                  width: "87%",
                  height: "2rem",
                  borderColor: "rgb(173, 169, 173)",
                  borderRadius: "0.4rem",
                  backgroundColor: "white",
                  outline: "none",
                  border: "1px solid rgb(222, 87, 229)",
                  padding: "0.5rem",
                }}
                type="email"
                placeholder="Enter Email"
              />
            </div>

            <div style={{ marginTop: "1rem" }}>
              <div style={{ textAlign: "left", paddingLeft: "2rem" }}>
                Old Password
              </div>
              <input
                ref={oldPasswordRef}
                style={{
                  marginLeft: "0rem",
                  marginTop: "0.5rem",
                  width: "87%",
                  height: "2rem",
                  borderColor: "rgb(173, 169, 173)",
                  borderRadius: "0.4rem",
                  backgroundColor: "white",
                  outline: "none",
                  border: "1px solid rgb(222, 87, 229)",
                  padding: "0.5rem",
                }}
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter Old Password"
              />
                <div
                style={{ textAlign: "left", paddingLeft: "2rem" ,cursor: "pointer" }}
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                 {showOldPassword ? <ViewIcon /> : <ViewOffIcon />}
              </div>
             
            </div>
            <div style={{ marginTop: "1rem" }}>
              <div style={{ textAlign: "left", paddingLeft: "2rem" }}>
                New Password
              </div>
              <input
                ref={newPasswordRef}
                style={{
                  marginLeft: "0rem",
                  marginTop: "0.5rem",
                  width: "87%",
                  height: "2rem",
                  borderColor: "rgb(173, 169, 173)",
                  borderRadius: "0.4rem",
                  backgroundColor: "white",
                  outline: "none",
                  border: "1px solid rgb(222, 87, 229)",
                  padding: "0.5rem",
                }}
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter New Password"
              />
               <div
                style={{ textAlign: "left", paddingLeft: "2rem" ,cursor: "pointer" }}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                 {showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
              </div>
             
            </div>
            <div style={{ marginTop: "1rem" }}>
              <div style={{ textAlign: "left", paddingLeft: "2rem" }}>
                Confirm New Password
              </div>
              <input
                ref={cnewPasswordRef}
                style={{
                  marginLeft: "0rem",
                  marginTop: "0.5rem",
                  width: "87%",
                  height: "2rem",
                  borderColor: "rgb(173, 169, 173)",
                  borderRadius: "0.4rem",
                  backgroundColor: "white",
                  outline: "none",
                  border: "1px solid rgb(222, 87, 229)",
                  padding: "0.5rem",
                }}
                type={showcNewPassword ? "text" : "password"}
                placeholder="Confirm New Password"
              />
              <div
                style={{ textAlign: "left", paddingLeft: "2rem" ,cursor: "pointer" }}
                onClick={() => setShowcNewPassword(!showcNewPassword)}
              >
                 {showcNewPassword ? <ViewIcon /> : <ViewOffIcon />}
              </div>
            </div>
            <div
              style={{
                height: "auto",
                width: "86%",
                margin: "auto",
                marginTop: "1rem",
                padding: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <input
                className={styles.registerbutton}
                type="submit"
                value={"CONTINUE"}
              />
            </div>
          </div>
          {
            <div
            style={
              error
                ? {
                    display: "block",
                    height: "auto",
                    backgroundColor: "rgb(224, 120, 120)",
                    borderRadius: "1rem",
                    width: "84.3%",
                    margin: "auto",
                    marginTop: "1rem",
                    padding: "0.5rem",
                  }
                : { display: "none" }
            }
          >
            please provide the correct confirm password
          </div>
          }
        </form>
      </div>
    </div>
  );
};

export default Forgot;
