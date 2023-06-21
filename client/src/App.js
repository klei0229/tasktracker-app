import "./App.css";
import { LoginAndSignUpPage } from "./components/LoginAndSignUpPage";
import Dashboard from "./components/Dashboard";
import React, { useEffect, useState } from "react";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  // const [currentUser, setCurrentUser] = useState(1);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("name");

    if(token !== null){
      setCurrentUser(token);
      setName(username)
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Tracker</h1>

        {currentUser == null ? (
          <LoginAndSignUpPage
            setName={setName}
            setCurrentUser={setCurrentUser}
          ></LoginAndSignUpPage>
        ) : (
          <Dashboard
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            name={name}
          ></Dashboard>
        )}
      </header>
    </div>
  );
}

export default App;
