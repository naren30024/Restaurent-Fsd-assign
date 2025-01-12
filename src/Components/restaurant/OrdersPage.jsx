import React, { useState, useEffect } from "react";
import axios from "axios";


const OrdersPage = () => {
  const [orders, setOrders] = useState([
    
  ]);

  const orderStates = ["Order Placed", "Confirmed", "Completed", "Denied"];

  // Function to handle state change
  const handleOrderStateChange = (id, newState) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, orderState: newState } : order
      )
    );
  };
  useEffect(() => {
    // Fetch data from Django backend
    axios
      .get("http://127.0.0.1:8000/Emitra-api/getorders/")  // Adjust URL based on your Django API
      .then((response) => {
        // Update the products state with the data from the response
        setOrders(response.data);
      })
      .catch((error) => {
        // Handle any errors during the fetch
        
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Orders</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Menu Item Name</th>
              <th>Customer Name</th>
              <th>Customer Number</th>
              <th>Order State</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.menuItemName}</td>
                <td>{order.customerName}</td>
                <td>{order.customerNumber}</td>
                <td>
                  <select
                    className="form-select"
                    value={order.orderState}
                    onChange={(e) =>
                      handleOrderStateChange(order.id, e.target.value)
                    }
                  >
                    {orderStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
