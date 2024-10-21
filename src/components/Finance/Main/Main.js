import React, { useState ,useEffect } from 'react';
import Income from '../Income/Income';
import Expense from '../Expense/Expense';
import Home from '../Home/Home';
import './Main.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

export default function Main() {
  const [totalIncome, setTotalIncome] = useState(() => {
    const savedIncome = localStorage.getItem('totalIncome');
    return savedIncome ? JSON.parse(savedIncome) : 0;
  });
  const [totalExpense, setTotalExpense] = useState(() => {
    const savedExpense = localStorage.getItem('totalExpense');
    return savedExpense ? JSON.parse(savedExpense) : 0;
  });

  useEffect(() => {
    localStorage.setItem('totalIncome', JSON.stringify(totalIncome));
  }, [totalIncome]);

  useEffect(() => {
    localStorage.setItem('totalExpense', JSON.stringify(totalExpense));
  }, [totalExpense]);
  return (
    <Router>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
          Home
        </NavLink>
        <NavLink to="/expense" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
          Expense
        </NavLink>
        <NavLink to="/income" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
          Income
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home totalIncome={totalIncome} totalExpense={totalExpense}/>} />
        <Route path="/expense" element={<Expense setTotalExpense={setTotalExpense} />} />
        <Route path="/income" element={<Income setTotalIncome={setTotalIncome} />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}
