import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UserContext from './Context/UserContext';
import AllRoutes from './Routes/AllRoutes';
import { initializeLocalStorage } from './Utils/initData';
import { getLocalData } from './Utils/localStorageUtils';


function App() {
  const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
      initializeLocalStorage();
      const user = getLocalData("user") || {};
      setUserInfo({
        loginStatus: localStorage.getItem("loginStatus") ?? "",
        token: localStorage.getItem("token") ?? "",
        user: user,
      });
    }, []);

  return (
    <div className="App">
      <UserContext.Provider value={userInfo}>
        <Router>
          <AllRoutes />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
