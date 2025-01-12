import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './Components/restarant_list';
import MenuPage from './Components/customers/Menu';
import LoginPage from './Components/restaurant/Login';
import RestaurantMenuPage from './Components/restaurant/MenuItem';
import OrdersPage from './Components/restaurant/OrdersPage';
import CustmorRegistrationPage from './Components/customers/Customer_Registration';
import CustomerLoginPage from './Components/customers/CustomerLogin';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<CustmorRegistrationPage/>}/>
        <Route path='/Customer-Login' element={<CustomerLoginPage/>}/>
        <Route path="/Login" element={<LoginPage />} />       {/* Login page route */}
        <Route path="/Rest-Abc-1" element={<MenuPage />} />
        <Route path="/Rest-Abc-12" element={<RestaurantMenuPage />} />
        <Route path="/Rest-Abc-1/order" element={<OrdersPage />} />
        <Route path="/Restaurents" element={<RestaurantList/>}/>
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
