import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MenuPage = ({ userType }) => {
  const [menuItems, setMenuItems] = useState([
    
    {
      id:1,
      name: 'Pasta Carbonara',
      description: 'Creamy pasta with bacon and parmesan cheese.',
      restaurant_code:'',
      image_url: 'https://media.istockphoto.com/id/485599156/photo/spicy-homemade-buffalo-wings.jpg?s=612x612&w=0&k=20&c=dF0shjkws4bh4Isx7vBTw-tc5-C3ereRe4cDRG-5kLo=',
      price: 299,
      category: 'Main Course',
      item_type: 'Non-Vegetarian',
      calories: 500,
      preparation_time: '20 mins',
      average_rating: 3,
      
    },
    
    // Add more initial menu items here if needed
  ]);
  const location = useLocation();
  const userData = location.state?.user
  useEffect(() => {
    // Fetch data from Django backend
    axios
      .get("http://127.0.0.1:8000/Emitra-api/getmenuitem/")  // Adjust URL based on your Django API
      .then((response) => {
        // Update the products state with the data from the response
        setMenuItems(response.data);
      })
      .catch((error) => {
        // Handle any errors during the fetch
        
        console.error("Error fetching data:", error);
      });
  }, []);
  const [cartItems, setCartItems] = useState([])
  const [showCartModal, setShowCartModal] = useState(false);
  
   const [detailsVisibility, setDetailsVisibility] = useState({});
    const toggleDetails = (id) => {
    setDetailsVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
    };
  const totalItems = cartItems.length;
  const totalPrice = Array.isArray(cartItems)
  ? cartItems.reduce((sum, item) => sum + (item.price || 0), 0)
  : 0;

  const handlecartItems = () =>{
    
    const Item = {
      "menu_Item": cartItems[0].name,
      "customer_name":userData.name,
      "customer_number":userData.mobile,
      "restaurant_code":cartItems[0].restaurant_code,
      "state":'placed'
   }
   axios.post("http://127.0.0.1:8000/Emitra-api/postorders/",Item).
   then((response) => {
    console.log("Response:", response.data)

   })
   .catch((error) => {
    console.error("Error:", error);
    
  });
  }
  
 

  return (
    <>
    <div className="container">
      <h1 className="my-4">Restaurant Menu</h1>
      <div className="row">
        {menuItems.map((item) => (
          <div className="col-md-6 mb-4 " key={item.id}>
            <div className="card">
            <div className='row'>
              <div className='col-4 justify-content-center align-items-center mt-15'>
                <img src={item.image_url} className="card-img-top m-2" alt={item.name} />
              </div>
              
              <div className="col-6 ">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                
                {detailsVisibility[item.id] && (
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Category: {item.category}</li>
                    <li className="list-group-item">Type: {item.item_type}</li>
                    <li className="list-group-item">Calories: {item.calories}</li>
                    <li className="list-group-item">Preparation Time: {item.preparation_time}</li>
                    
                    
                  </ul>
                  
                )}
                 <div className='font-weight-bolder' style={{justifyContent:"center",alignItems:"center",marginTop:"1rem",marginRight:"1rem",fontSize:"20px",fontWeight:"bold"}}>
                   {item.price}
                 </div>
                {detailsVisibility[item.id] ? (
                  <button className="btn btn-secondary" onClick={() => toggleDetails(item.id)}>
                    ↑
                  </button>
                  ) : (
                  <button className="btn btn-secondary" onClick={() => toggleDetails(item.id)}>
                    ↓
                  </button>
                )}

              </div>
              <div className='col-2 pt-10 '>
                <div style={{fontSize:"20px"}}>
                  {"⭐".repeat(item.average_rating)}{" "}
                  {"☆".repeat(3 - item.average_rating)}
                </div>
                <div className='' style={{justifyContent:"center",alignItems:"center",marginTop:"1rem",marginRight:"1rem"}}>
                  <button className='btn btn-secondary' onClick={ () =>{ setCartItems((prev) => [...prev, item] ) && console.log(cartItems)}}>+</button>
                </div>
               
               
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
      {cartItems ? (
        <div>
        {/* Cart Button */}
        <button
          className="btn btn-primary"
          onClick={() => setShowCartModal(true)}
        >
          Open Cart
        </button>
  
        {/* Cart Modal */}
        {showCartModal && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => setShowCartModal(false)}
          >
            <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Cart</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCartModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    {/* Left Column */}
                    <div className="col-md-6">
                      <h6>Item Names</h6>
                      <ul className="list-group">
                        {cartItems.map((item) => (
                          <li key={item.id} className="list-group-item">
                            {item.name}
                          </li>
                        ))}
                      </ul>
                      <hr />
                      <p><strong>Total Items:</strong> {totalItems}</p>
                    </div>
  
                    {/* Right Column */}
                    <div className="col-md-6">
                      <h6>Item Prices</h6>
                      <ul className="list-group">
                        {cartItems.map((item) => (
                          <li key={item.id} className="list-group-item">
                            ${item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                      <hr />
                      <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-info"
                    onClick={() =>{   handlecartItems() && setShowCartModal(false)}}
                  >
                    Place Order
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowCartModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
  
       
      </div>
      ):null}
      </div>
    </>
  );
};

export default MenuPage;

