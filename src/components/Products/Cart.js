import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css"

export default function Cart({ cart, onRemoveFromCart }) {
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <>
         <div className="cart">
        <h2>Shopping Cart</h2>
        <div className="cart-list">
        {cart.length > 0 ? (
          <>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <h3>{item.name}</h3>
                <p>Category: {item.category}</p>
                <p>Price: ${item.price}</p>
                <img src={item.img} alt={item.name} />
                <button onClick={() => onRemoveFromCart(index)}>Remove</button>
              </div>
            ))}
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
        </div>
        <h3>{cart.length > 0 ?(
            <>Your total is: {totalPrice}$</>
        ) : (
            <></>
        )}</h3>
      </div>
      <button onClick={() => navigate("/")} className="go-back-button">Go Back</button>
    </>
  );
}
