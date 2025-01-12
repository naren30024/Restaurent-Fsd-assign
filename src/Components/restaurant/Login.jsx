import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
  const [formData, setFormData] = useState({
    "usertype": "",
    "Email": "",
    "password": "",
    "restaurant_code": "",
  });
   const navigate = useNavigate();
  const handleChange = (e) => {
    
    setFormData((prevstate) => ({...prevstate, [e.target.name]:e.target.value}))
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();

    
    try {
      const response = await fetch("http://127.0.0.1:8000/Emitra-api/rest_login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        alert(`Login successful`);

        navigate('/Rest-Abc-12', { state: { userType: data[0].usertype } });

      } else {
        alert("Login failed: " + response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* User Type */}
                <div className="mb-3">
                  <label htmlFor="userType" className="form-label">
                    Select User Type
                  </label>
                  <select
                    id="usertype"
                    name="usertype"
                    className="form-select"
                    
                    value={formData.usertype}
                    onChange={handleChange}
                  >
                     <option value="type">Select user Type</option>
                    <option value="Owner">Owner</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="Email"
                    className="form-control"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Restaurant Code */}
                <div className="mb-3">
                  <label htmlFor="restaurantCode" className="form-label">
                    Restaurant Code
                  </label>
                  <input
                    type="text"
                    id="restaurantCode"
                    name="restaurant_code"
                    className="form-control"
                    value={formData.restaurant_code}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
