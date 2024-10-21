import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Home.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home({ totalIncome, totalExpense }) {
  const [totalBalance, setTotalBalance] = useState(() => {
    const balance = localStorage.getItem("balance");
    return balance ? JSON.parse(balance) : 0;
  });

  useEffect(() => {
    const newBalance = totalIncome - totalExpense;
    setTotalBalance(newBalance);
    localStorage.setItem("balance", JSON.stringify(newBalance));
  }, [totalIncome, totalExpense]);

  const data = {
    labels: ["Total Income", "Total Expense", "Balance"],
    datasets: [
      {
        data: [totalIncome, totalExpense, totalBalance],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#2A80B3", "#D82B5D", "#D6B84E"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Financial Overview',
      },
    },
  };

  return (
    <div className="container">
      <h2>HomePage</h2>
      <h3>Total Balance: ${totalBalance}</h3>
      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
