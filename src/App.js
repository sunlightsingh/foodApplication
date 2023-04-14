import React, { useState, useEffect } from "react";

import "./App.css"; // Import CSS file for styling

const App = () => {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodType, setFoodType] = useState("");
  const [maxDeliveryTime, setMaxDeliveryTime] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterTime, setFilterTime] = useState("");

  useEffect(() => {
    // Load food items from local storage on component mount
    const storedFoods = localStorage.getItem("foods");
    if (storedFoods) {
      setFoods(JSON.parse(storedFoods));
    }
  }, []);

  useEffect(() => {
    // Update local storage when food items change
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (foodName && foodType && maxDeliveryTime) {
      const newFood = {
        id: new Date().getTime(),
        foodName,
        foodType,
        maxDeliveryTime,
      };
      setFoods([...foods, newFood]);
      setFoodName("");
      setFoodType("");
      setMaxDeliveryTime("");
    }
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterTimeChange = (e) => {
    setFilterTime(e.target.value);
  };

  const filteredFoods = foods.filter((food) => {
    return (
      (!filterType || food.foodType === filterType) &&
      (!filterTime || food.maxDeliveryTime <= filterTime)
    );
  });

  return (
    <div className="app">
      <h1>Food App</h1>
      <div className="form-container">
        <h2>Create Food Item</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Food Name:
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </label>
          <label>
            Food Type:
            <select
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
            >
              <option value="">Select a food type</option>
              <option value="Delicious Food">Delicious Food</option>
              <option value="Nutritious Food">Nutritious Food</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Beverages">Beverages</option>
              <option value="Desserts">Desserts</option>
            </select>
          </label>
          <label>
            Max Delivery Time (minutes):
            <input
              type="number"
              value={maxDeliveryTime}
              onChange={(e) => setMaxDeliveryTime(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="filter-container">
        <h2>Filter Food Items</h2>
        <label>
          Food Type:
          <select value={filterType} onChange={handleFilterTypeChange}>
            <option value="">All</option>
            <option value="Delicious Food">Delicious Food</option>
            <option value="Nutritious Food">Nutritious Food</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Beverages">Beverages</option>
            <option value="Desserts">Desserts</option>
          </select>
        </label>
        <label>
          Max Delivery Time (minutes):
          <input
            type="number"
            value={filterTime}
            onChange={handleFilterTimeChange}
          />
        </label>
      </div>
      <div className="food-list-container">
        <h2>Food Items</h2>
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <div key={food.id} className="food-item">
              <h3>{food.foodName}</h3>
              <p>Food Type: {food.foodType}</p>
              <p>Max Delivery Time: {food.maxDeliveryTime} minutes</p>
            </div>
          ))
        ) : (
          <p>No food items found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
