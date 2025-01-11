import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RestaurantList.css"; // Custom CSS for additional styling


const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([
    {
      "name":"Moms Kitchen",
      "description":"A cozy, vibrant restaurant serving delicious, globally-inspired dishes crafted from fresh, local ingredients. Perfect for intimate dinners or lively gatherings!",
      "image":'mkitch',
      "category":"Veg & Non Veg",
      "type":"South Indian",
      "rating":2,

    }
  ]);

  // Fetch restaurants from Django backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/Emitra-api/restaurants/") // Replace with your API endpoint
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurant data:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Restaurant Listings</h2>
      <div className="row">
        {restaurants.map((restaurant) => (
          <div className="" key={restaurant.id}>
            <div className="restaurant-card d-flex flex-sm-column flex-s-column flex-md-column flex-lg-row border p-3">
              {/* Restaurant Image */}
              <div className="restaurant-image mb-3 mb-lg-0">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="img-fluid rounded"
                />
              </div>

              {/* Restaurant Details */}
              <div className="restaurant-details ms-lg-3">
                <h4 className="restaurant-name">{restaurant.name}</h4>
                <p className="restaurant-description">{restaurant.description}</p>
                <p className="restaurant-meta">
                  <strong>Category:</strong> {restaurant.category} <br />
                  <strong>Type:</strong> {restaurant.type}
                </p>
                {/* Star Rating */}
                <div className="restaurant-rating">
                  {"⭐".repeat(restaurant.rating)}{" "}
                  {"☆".repeat(3 - restaurant.rating)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
