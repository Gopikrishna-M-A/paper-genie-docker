import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import GenerateOption from "./components/GeneratePaper/GenerateOption";
import GeneratePaper from "./components/GeneratePaper/GeneratePaper";
import GenerateRandomPaper from "./components/GeneratePaper/RandomPaper";
import Questions from "./components/Questions/Questions";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import QuestionPaper from "./components/QuestionPaper/QuestionPaper"
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Settings from "./components/Settings/Settings";
import Tutorial from "./components/Tutorial/Tutorial"
import baseURL from './components/baseURL'
import axios from 'axios'
import { message, ConfigProvider } from "antd";

function App() {
  const [user, setUser] = useState(null);
  
  const handleWarning = () => {
    message.warning('Question added successfully!');
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/auth/check-auth`, { withCredentials: true })
      .then((response) => {
        if (response.data.isAuthenticated) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#242527",
          // Alias Token
          colorBgContainer: "#ffffff",
        },
      }}
    >
      <Router>
        <Navbar user={user} setUser={setUser} className="nav" />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/Add-question" element={user ? <AddQuestion user={user} /> : <Login user={user} />} />
          <Route path="/Create" element={user ? <GenerateOption user={user} /> : <Login user={user} />} />
          <Route path="/Create-custom-paper" element={user ? <GeneratePaper user={user} /> : <Login user={user} />} />
          <Route path="/Create-random-paper" element={user ? <GenerateRandomPaper user={user} /> : <Login user={user} />} />
          <Route path="/view-questions" element={user ? <Questions user={user} /> : <Login user={user} />} />
          <Route path="/question-paper" element={<QuestionPaper user={user} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Footer />
      </Router>
    </ConfigProvider>
  );
}

export default App;
