import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const CustomerLoginPage = () => {
  const [formData, setFormData] = useState({
   " Email": "",
    "password": "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserData(null);
    console.log(formData)

    try {
      // Sending data to Django backend
      const response = await axios.post("http://127.0.0.1:8000/Emitra-api/cust_login/", formData);
      
      if (response.status === 200) {
        setUserData(response.data);
        alert("Login Successful!");
        navigate('/Rest-Abc-1', { state: { user: userData } });
      }
    } catch (err) {
      console.error(err);
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header text-center">
              <h3>Customer Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
                <div>
                  Don't have an account <a href="/">Register</a>
                </div>
              </form>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoginPage;
