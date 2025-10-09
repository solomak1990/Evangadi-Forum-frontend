
import React, { useContext, useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./component/Dataprovider/DataProvider.jsx";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import axios from "./axiosConfig";
import Question from "./Pages/Question/Question.jsx";
import Register from "./Pages/Register/Register.jsx";
import Answer from "./Pages/Answer/Answer.jsx";
import NotFound from "./Pages/Login/Notfound";
import QuestionList from "./Pages/QuestionList/QuestionList";

export const AppState = createContext();
function App() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const checkUser2 = async () => {
    try {
      const { data } = await axios.get("api/user/checkUser", {
        headers: {
          Authorization: "Bearer " + (userData.token || localStorage.getItem("token") || ""),
        },
      });
      setUserData({ user: data, token: userData.token || localStorage.getItem("token") });
      setUser(data);
      
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const effectiveToken = userData.token || localStorage.getItem("token");
    if (effectiveToken) {
      checkUser2();
    } else {
      navigate("/login");
    }
  }, [userData.token]);
  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/question/:id" element={<Answer />} />
        <Route path="/allquestion" element={<QuestionList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppState.Provider>
  );
}
export default App;