import logo from './logo.svg';
import './App.css';
import RestaurantList from './Components/restarant_list';
import MenuPage from './Components/customers/Menu';
import LoginPage from './Components/restaurant/Login';
import RestaurantMenuPage from './Components/restaurant/MenuItem';

function App() {
  return (
    <>
    <div className="App">
      {/* <MenuPage/> */}
      {/* <RestaurantList/> */}
      {/* <LoginPage/> */}
      <RestaurantMenuPage/>

    </div>
    </>
  );
}

export default App;
