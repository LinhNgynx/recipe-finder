import React, { useState } from "react";
import handbag from "../../assets/img/bag.avif";
import bottle from "../../assets/img/bottle.avif";
import headphone from "../../assets/img/headphone.avif";
import oil from "../../assets/img/oil.avif";
import skincare from "../../assets/img/skincare.avif";
import watch from "../../assets/img/watch.avif";
import "./Products.css";
import { useNavigate } from "react-router-dom";

export default function Products({ onAddToCart }) {
  const initialProducts = [
    { name: "HandBag", category: "beauty", price: 100, img: handbag },
    { name: "Bottle", category: "grocery", price: 50, img: bottle },
    { name: "Headphone", category: "electronics", price: 200, img: headphone },
    { name: "Oil", category: "grocery", price: 25, img: oil },
    { name: "Skincare", category: "beauty", price: 75, img: skincare },
    { name: "Watch", category: "accessories", price: 150, img: watch },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [isWatching, setIsWatching] = useState(false);
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleFilter = (e) => {
    e.preventDefault();
    if (category) {
      const newProducts = initialProducts.filter(
        (product) => product.category === category
      );
      if (newProducts.length !== 0) {
        setProducts(newProducts);
      } else {
        alert("There is no such category");
      }
    } else {
      alert("Enter a category");
    }
    setCategory("");
  };

  const handleSort = (e) => {
    e.preventDefault();
    let newProducts;
    if (order === "ascendent") {
      newProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (order === "descendent") {
      newProducts = [...products].sort((a, b) => b.price - a.price);
    } else {
      newProducts = [...products];
    }
    setProducts(newProducts);
  };

  const handleView = (product) => {
    setIsWatching(true);
    setProduct(product);
  };

  const handleStopView = () => {
    setIsWatching(false);
    setProduct(null);
  };

  const handleAddToCart = (product) => {
    if (product && product.name) {
      onAddToCart(product);
      alert(`${product.name} has been added to your cart!`);
    } else {
      alert("Cannot add to cart: Product is not available.");
    }
  };

  return (
    <>
      {isWatching ? (
        <div className="product-item">
          <h2>{product.name}</h2>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <img src={product.img} alt={product.name} />
          <br />
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          <button onClick={handleStopView}>Go Back</button>
        </div>
      ) : (
        <>
          <form onSubmit={handleSort}>
            <label htmlFor="order">Select order</label>
            <select
              id="order"
              name="order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="ascendent">ascendent</option>
              <option value="descendent">descendent</option>
            </select>
            <input type="submit" value="Sort" />
          </form>
          <form onSubmit={handleFilter}>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input type="submit" value="Filter" />
          </form>
          <button onClick={() => setProducts(initialProducts)} className="reset-button">
            Reset Product
          </button>
          <div className="product-list">
            {products.map((product, i) => (
              <div
                key={i}
                className="product-item"
                onClick={() => handleView(product)}
              >
                <h2>{product.name}</h2>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
                <img src={product.img} alt={product.name} />
                <div className="button-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/cart")} className="cart-button">View Cart</button>
        </>
      )}
    </>
  );
}
