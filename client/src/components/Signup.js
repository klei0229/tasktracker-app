import React, { useState } from "react";

const Signup = (props) => {
  const { setCurrentUser, setName } = props;
  const [signUpCredentials, setSignUpCredentials] = useState("");
  const signup = async (e) => {
    e.preventDefault();
    console.log("signup pressed");
    try {
      const body = { name: signUpCredentials };
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const responseJSON = await response.json();
      
      if(responseJSON == 'error'){
        alert('could not make this user, user may already exist')
        return;
      }
      const userId = responseJSON?.rows[0].user_id;
      const name = responseJSON?.rows[0].name;
      setCurrentUser(userId);
      setName(name);
      localStorage.setItem("token", userId);
      localStorage.setItem("name", name);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  return (
    <div>
      <h4>Sign Up</h4>
      <input
        name={signUpCredentials}
        onChange={(e) => {
          setSignUpCredentials(e.target.value);
        }}
        placeholder="name"
      ></input>
      <button onClick={signup}>Sign Up</button>
    </div>
  );
};

export default Signup;
