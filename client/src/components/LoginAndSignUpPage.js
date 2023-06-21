import React from "react";
import Login from "./Login";
import Signup from "./Signup";

export const LoginAndSignUpPage = (props) => {
  const { setCurrentUser, setName } = props;
  return (
    <div>
      <Login setName={setName} setCurrentUser={setCurrentUser}></Login>
      <hr></hr>
      <Signup setName={setName} setCurrentUser={setCurrentUser}></Signup>
    </div>
  );
};
