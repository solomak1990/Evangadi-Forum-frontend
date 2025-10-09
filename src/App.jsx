import React, { useContext, useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./component/Dataprovider/DataProvider.jsx";
// import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import axios from "./axiosConfig";
import Question from "./Pages/Question/Question.jsx"
import Register from "./Pages/Register/Register.jsx"
import Answer from "./Pages/Answer/Answer.jsx";
 import axiosBase from "./axiosConfig";
import Profile from "./component/Header/Profile";
import NotFound from "./Pages/Login/Notfound";
import QuestionList from "./Pages/QuestionList/QuestionList"

// import Profile from "./component/Header/Profile";
// import NotFound from "./pages/login/Notfound";
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
      {/* <Route path="/profile" element={<Profile />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/question/:id" element={<Answer />} />
        <Route path="/allquestion" element={<QuestionList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppState.Provider>
  );
}
export default App;