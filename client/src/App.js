import React from "react"

import './App.css';
import {
    Route,
    Routes
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from "./components/views/RegisterPage/RegisterPage"
import MainPage from "./components/views/Main"
import RegisterContentPage from "./components/views/RegisterContentPage"
import Header from "./components/views/Header/Header"

function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route exact path="/" element={LoginPage()}/>
                <Route exact path="/login" element={LoginPage()}/>
                <Route exact path="/register" element={RegisterPage()}/>
                <Route exact path="/main" element={MainPage()}/>
                <Route exact path="/registerContent" element={RegisterContentPage()}/>
            </Routes>
        </div>
    );
}

export default App;