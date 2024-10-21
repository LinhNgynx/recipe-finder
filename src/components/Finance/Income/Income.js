import React, { useEffect, useState } from "react";
import "./Income.css";

export default function Income({setTotalIncome }) {
  const [incomes, setIncomes] = useState(() => {
    const getIncome = localStorage.getItem("incomes");
    return getIncome ? JSON.parse(getIncome) : [];
  });
  const [income, setIncome] = useState({
    category: "",
    description: "",
    amount: "",
    id: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editingField, setEditingField] = useState({
    category: false,
    description: false,
    amount: false,
  });
  const [editIncome, setEditIncome] = useState({
    category: "",
    description: "",
    amount: "",
    id: "",
  });
  const totalIncomes = incomes.reduce((total, currentIncome) => {
    return total + parseFloat(currentIncome.amount || 0);
  }, 0);
  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
    setTotalIncome(totalIncomes);
  }, [incomes, totalIncomes, setTotalIncome]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!income.category || !income.description || !income.amount) {
      window.alert("Fill all the sites");
      return;
    }
    const newIncome = { ...income, id: Date.now() };
    const newIncomes = [...incomes, newIncome];
    setIncomes(newIncomes);
    setIncome({
      category: "",
      description: "",
      amount: "",
      id: "",
    });
  };

  const handleChange = (e, prop) => {
    const newIncome = { ...income, [prop]: e.target.value };
    setIncome(newIncome);
  };

  const handleDelete = (id) => {
    const newIncomes = incomes.filter((income) => income.id !== id);
    setIncomes(newIncomes);
  };

  const handleFieldClick = (field, index) => {
    setEditIndex(index);
    setEditingField({ ...editingField, [field]: true });
    setEditIncome(incomes[index]);
  };

  const handleChangeIncome = (e, field) => {
    const newIncome = { ...editIncome, [field]: e.target.value };
    setEditIncome(newIncome);
  };

  const handleBlurOrEnter = (e, field, index) => {
    if (e.type === "blur" || e.key === "Enter") {
      if (
        !editIncome.category ||
        !editIncome.description ||
        !editIncome.amount
      ) {
        window.alert("Fill all the sites");
        return;
      }
      const updatedIncomes = [...incomes];
      updatedIncomes[index] = editIncome;
      setIncomes(updatedIncomes);
      setEditingField({ ...editingField, [field]: false });
      setEditIndex(null);
      setEditIncome({
        category: "",
        description: "",
        amount: "",
        id: "",
      });
    }
  };

  return (
    <div className="container">
      <h2>Income Page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={income.category}
          onChange={(e) => handleChange(e, "category")}
        >
          <option value="">Select</option>
          <option value="Salary">Salary</option>
          <option value="Trade">Trade</option>
          <option value="Youtube">Youtube</option>
          <option value="Freelance">Freelance</option>
        </select>
        <label htmlFor="desc">Description</label>
        <input
          type="text"
          id="desc"
          name="desc"
          value={income.description}
          onChange={(e) => handleChange(e, "description")}
        />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={income.amount}
          onChange={(e) => handleChange(e, "amount")}
        />
        <input type="submit" value="Add" />
      </form>
      <h3>Total Income: {totalIncomes} $</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income, index) => (
            <tr key={income.id}>
              <td>
                {editingField.category && editIndex === index ? (
                  <select
                    value={editIncome.category}
                    onChange={(e) => handleChangeIncome(e, "category")}
                    onBlur={(e) => handleBlurOrEnter(e, "category", index)}
                    onKeyDown={(e) => handleBlurOrEnter(e, "category", index)}
                    autoFocus
                  >
                    <option value="">Select</option>
                    <option value="Salary">Salary</option>
                    <option value="Trade">Trade</option>
                    <option value="Youtube">Youtube</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                ) : (
                  <span onClick={() => handleFieldClick("category", index)}>
                    {income.category}
                  </span>
                )}
              </td>
              <td>
                {editingField.description && editIndex === index ? (
                  <input
                    type="text"
                    value={editIncome.description}
                    onChange={(e) => handleChangeIncome(e, "description")}
                    onBlur={(e) => handleBlurOrEnter(e, "description", index)}
                    onKeyDown={(e) =>
                      handleBlurOrEnter(e, "description", index)
                    }
                    autoFocus
                  />
                ) : (
                  <span onClick={() => handleFieldClick("description", index)}>
                    {income.description}
                  </span>
                )}
              </td>
              <td>
                {editingField.amount && editIndex === index ? (
                  <input
                    type="number"
                    value={editIncome.amount}
                    onChange={(e) => handleChangeIncome(e, "amount")}
                    onBlur={(e) => handleBlurOrEnter(e, "amount", index)}
                    onKeyDown={(e) => handleBlurOrEnter(e, "amount", index)}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => handleFieldClick("amount", index)}>
                    {income.amount}
                  </span>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(income.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
