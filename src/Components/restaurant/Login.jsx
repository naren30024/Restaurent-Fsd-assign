import React, { useState } from "react";


const LoginPage = () => {
  const [formData, setFormData] = useState({
    userType: "",
    email: "",
    password: "",
    restaurantCode: "",
  });

  const handleChange = (e) => {
    // const { name, value, type, selectedOptions } = e.target;

    // if (type === "select-multiple") {
    //   const values = Array.from(selectedOptions, (option) => option.value);
    //   setFormData((prevState) => ({ ...prevState, [name]: values }));
    // } else {
    //   setFormData((prevState) => ({ ...prevState, [name]: value }));
    // }
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
        alert(`Login successful`);
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
                    id="userType"
                    name="userType"
                    className="form-select"
                    
                    value={formData.userType}
                    onChange={handleChange}
                  >
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
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
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
                    name="restaurantCode"
                    className="form-control"
                    value={formData.restaurantCode}
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
