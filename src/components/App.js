import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useState } from "react";
import "../assets/styles/reset.css";
import GlobalStyle from "../assets/styles/globalStyles";

import Login from "./Login";
import Signup from "./Signup";
import Transactions from "./Transactions";
// import Income from "./Income";
// import Expense from "./Expense";

export default function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/transactions" element={<Transactions />} />
          {/* <Route path="/income" element={<Income />} />  
          <Route path="/expense" element={<Expense />} />   */}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
