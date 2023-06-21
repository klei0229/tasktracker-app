import React, { useState } from "react";


const Login = (props) => {
  const { setCurrentUser, setName } = props;
  console.log(setName);
  const [loginCredentials, setLoginCredentials] = useState("");

  const login = async (e) => {

    if(loginCredentials.length == 0 ){
        alert('Name cannot be empty');
        return;
    }
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/users/${loginCredentials}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON)

      if(responseJSON == 'error'){
        alert('Not a valid user')
        return;
      }

      if(responseJSON.rows.length == 0){
        alert('Not a valid user')
        return;
      }
      const userId = responseJSON?.rows[0].user_id;
      const userName = responseJSON?.rows[0].name;
      setCurrentUser(userId);
      setName(userName);
      localStorage.setItem("token", userId);
      localStorage.setItem("name", userName);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h4>Log In</h4>
      <input
        name="loginCredentials"
        placeholder="name"
        onChange={(e) => {
          setLoginCredentials(e.target.value);
        }}
      ></input>
      <button onClick={login}>Log In</button>
    </div>
  );
};

export default Login;
