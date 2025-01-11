import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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
  useEffect(() => {
    // Fetch data from Django backend
    axios
      .get("http://127.0.0.1:8000/Emitra-api/getmenuitem/")  // Adjust URL based on your Django API
      .then((response) => {
        // Update the products state with the data from the response
        setProducts(response.data);
      })
      .catch((error) => {
        // Handle any errors during the fetch
        setError("Failed to fetch products");
        console.error("Error fetching data:", error);
      });
  }, []);
  const [cartItems, setCartItems] = useState([])
  const [showCartModal, setShowCartModal] = useState(false);

  const totalItems = cartItems.length;
  const totalPrice = Array.isArray(cartItems)
  ? cartItems.reduce((sum, item) => sum + (item.price || 0), 0)
  : 0;

  const handlecartItems = (cart_item) =>{
    const Item = {
      "menu_Item": cartitem.name,
      "restaurant_code":cartitem.restaurant_code,


    }
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
                  <button className='btn btn-secondary' onClick={ () => { handlecartItems(item)}}>+</button>
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
                    onClick={() => setShowCartModal(false)}
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
      {userType === 'Manager' || userType === 'Owner' ? (
        <button
          className="btn btn-primary mt-3"
          onClick={() => setShowModal(true)}
        >
          Add Menu Item
        </button>
      ) : null}

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Menu Item</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="image"
                      value={newItem.image}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newItem.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={newItem.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      value={newItem.category}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <input
                      type="text"
                      className="form-control"
                      name="type"
                      value={newItem.type}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Calories</label>
                    <input
                      type="number"
                      className="form-control"
                      name="calories"
                      value={newItem.calories}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Preparation Time</label>
                    <input
                      type="text"
                      className="form-control"
                      name="prepTime"
                      value={newItem.prepTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Average Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control"
                      name="rating"
                      value={newItem.rating}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      value={newItem.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddMenuItem}
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default MenuPage;

