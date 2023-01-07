import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './hoc/auth';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
    const NewLandingPage = Auth(LandingPage, null);
    const NewLoginPage = Auth(LoginPage, false);
    const NewRegisterPage = Auth(RegisterPage, false);

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<NewLandingPage />} />
                <Route exact path="/login" element={<NewLoginPage />} />
                <Route exact path="/register" element={<NewRegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;
