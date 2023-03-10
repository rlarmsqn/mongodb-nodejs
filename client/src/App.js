import './App.css';
import {
  Route,
  Routes
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from "./components/views/RegisterPage/RegisterPage"
import MainPage from "./components/views/Main"
import RegisterContentPage from "./components/views/RegisterContentPage";
import React from "react";

function App() {
  return (
        <div>
          <Routes>
            <Route exact path="/" element={LandingPage()}/>
            <Route exact path="/login" element={LoginPage()}/>
            <Route exact path="/register" element={RegisterPage()}/>
            <Route exact path="/main" element={MainPage()}/>
            <Route exact path="/registerContent" element={RegisterContentPage()}/>
          </Routes>
        </div>
  );
}

export default App;