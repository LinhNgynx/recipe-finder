import React, { useEffect, useState } from "react";
import "./Expense.css";

export default function Expense({setTotalExpense}) {
  const [expenses, setExpenses] = useState(() => {
    const getExpense = localStorage.getItem("expenses");
    return getExpense ? JSON.parse(getExpense) : [];
  });

  const [expense, setExpense] = useState({
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

  const [editExpense, setEditExpense] = useState({
    category: "",
    description: "",
    amount: "",
    id: "",
  });

  const totalExpenses = expenses.reduce((total, currentExpense) => {
    return total + parseFloat(currentExpense.amount || 0);
  }, 0);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    setTotalExpense(totalExpenses);
  }, [expenses, totalExpenses, setTotalExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.category || !expense.description || !expense.amount) {
      window.alert("Fill all the fields");
      return;
    }
    const newExpense = { ...expense, id: Date.now() };
    const newExpenses = [...expenses, newExpense];
    setExpenses(newExpenses);
    setExpense({
      category: "",
      description: "",
      amount: "",
      id: "",
    });
  };

  const handleChange = (e, prop) => {
    const newExpense = { ...expense, [prop]: e.target.value };
    setExpense(newExpense);
  };

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
  };

  const handleFieldClick = (field, index) => {
    setEditIndex(index);
    setEditingField({ ...editingField, [field]: true });
    setEditExpense(expenses[index]);
  };

  const handleChangeExpense = (e, field) => {
    const newExpense = { ...editExpense, [field]: e.target.value };
    setEditExpense(newExpense);
  };

  const handleBlurOrEnter = (e, field, index) => {
    if (e.type === "blur" || e.key === "Enter") {
      if (
        !editExpense.category ||
        !editExpense.description ||
        !editExpense.amount
      ) {
        window.alert("Fill all the fields");
        return;
      }
      const updatedExpenses = [...expenses];
      updatedExpenses[index] = editExpense;
      setExpenses(updatedExpenses);
      setEditingField({ ...editingField, [field]: false });
      setEditIndex(null);
      setEditExpense({
        category: "",
        description: "",
        amount: "",
        id: "",
      });
    }
  };

  return (
    <div className="container">
      <h2>Expense Page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={expense.category}
          onChange={(e) => handleChange(e, "category")}
        >
          <option value="">Select</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <label htmlFor="desc">Description</label>
        <input
          type="text"
          id="desc"
          name="desc"
          value={expense.description}
          onChange={(e) => handleChange(e, "description")}
        />

        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={(e) => handleChange(e, "amount")}
        />
        <input type="submit" value="Add" />
      </form>

      <h3>Total Expense: {totalExpenses} $</h3>

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
          {expenses.map((expense, index) => (
            <tr key={expense.id}>
              <td>
                {editingField.category && editIndex === index ? (
                  <select
                    value={editExpense.category}
                    onChange={(e) => handleChangeExpense(e, "category")}
                    onBlur={(e) => handleBlurOrEnter(e, "category", index)}
                    onKeyDown={(e) => handleBlurOrEnter(e, "category", index)}
                    autoFocus
                  >
                    <option value="">Select</option>
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                ) : (
                  <span onClick={() => handleFieldClick("category", index)}>
                    {expense.category}
                  </span>
                )}
              </td>
              <td>
                {editingField.description && editIndex === index ? (
                  <input
                    type="text"
                    value={editExpense.description}
                    onChange={(e) => handleChangeExpense(e, "description")}
                    onBlur={(e) => handleBlurOrEnter(e, "description", index)}
                    onKeyDown={(e) =>
                      handleBlurOrEnter(e, "description", index)
                    }
                    autoFocus
                  />
                ) : (
                  <span onClick={() => handleFieldClick("description", index)}>
                    {expense.description}
                  </span>
                )}
              </td>
              <td>
                {editingField.amount && editIndex === index ? (
                  <input
                    type="number"
                    value={editExpense.amount}
                    onChange={(e) => handleChangeExpense(e, "amount")}
                    onBlur={(e) => handleBlurOrEnter(e, "amount", index)}
                    onKeyDown={(e) => handleBlurOrEnter(e, "amount", index)}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => handleFieldClick("amount", index)}>
                    {expense.amount}
                  </span>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
