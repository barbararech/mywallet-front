import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useState } from 'react';
import '../assets/styles/reset.css'

import Login from "./Login";
import SignUp from "./SignUp";
import Transactions from "./Transactions";
import Income from "./Income";
import Expense from "./Expense";

export default function App() {
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{ user, setUser}}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/income" element={<Income />} />  
                <Route path="/expense" element={<Expense />} />  
            </Routes>
        </BrowserRouter>
        </UserContext.Provider>
    );
}