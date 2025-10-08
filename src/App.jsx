import React, { useContext, useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./component/Dataprovide/DataProvider";
import Home from "./pages/Home/Home";
import Login from "./Pages/Login/Login";
import axios from "./axiosConfig";
import Question from "./pages/Question/Question";
import Register from "./pages/Register/Register";
import Answer from "./pages/Answer/Answer";
import axiosBase from "./axiosConfig";
import Profile from "./component/Header/Profile";
import NotFound from "./pages/login/Notfound";

export const AppState = createContext();
function App() {
  const [userData, setUserData] = useContext(UserContext);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const checkUser2 = async () => {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUserData({ data });
      setUserData({ data });
      console.log(data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  
  useEffect(() => {
    checkUser2();
  }, []);
  return (
  

    <AppState.Provider value={{ user, setUser }}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/question" element={<Question />} />
      <Route path="/question/:id" element={<Answer />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </AppState.Provider>
  );
}
export default App;