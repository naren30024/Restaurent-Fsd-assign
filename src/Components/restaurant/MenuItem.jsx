import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const RestaurantMenuPage = () => {
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
  const navigate =useNavigate();
  const location = useLocation();
  const userData = location.state?.userType || 'default';
  console.log(userData)
  let userType = userData
  useEffect(() => {
    // Fetch data from Django backend
    userType = userData
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
  const [EditItems, setEditItems] = useState([])
  const [showEditMenuModal, setShowEditMenuModal] = useState(false);

  

  const [detailsVisibility, setDetailsVisibility] = useState({});
  const toggleDetails = (id) => {
  setDetailsVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
      name: '',
      description: '',
      restaurant_code: '',
      image_url:'',
      price: '',
      category: '',
      item_type: '',
      calories: '',
      preparation_time: '',
      average_rating: '',
  });

  const handleEditMenuItem = () => {
    setMenuItems([...menuItems, { id: menuItems.length + 1, ...newItem }]);
    setShowEditMenuModal(false);
    setNewItem({
      name: '',
      description: '',
      restaurant_code: '',
      image_url:'',
      price: '',
      category: '',
      item_type: '',
      calories: '',
      preparation_time: '',
      average_rating: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddMenuItem = async (e) => {
    setMenuItems([...menuItems, { id: menuItems.length + 1, ...newItem }]);
    setShowModal(false);
    setNewItem({
      name: '',
      description: '',
      restaurant_code: '',
      image_url:'',
      price: '',
      category: '',
      item_type: '',
      calories: '',
      preparation_time: '',
      average_rating: '',
    });
    try {
          // Sending data to Django backend
          const response = await axios.post("http://127.0.0.1:8000/Emitra-api/add_menuitem/", newItem);
          
          if (response.status === 200) {
            
            alert("MenuItem added successfully");
          }
        } catch (err) {
          console.error(err);
          alert("check all fields");
        }
  };
  const handleOrders = () =>{
    navigate('/Rest-Abc-1/order')
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
                {userType === 'manager' || userType === 'owner' ? (
                  <div className='' style={{justifyContent:"center",alignItems:"center",marginTop:"1rem",marginRight:"1rem"}}>
                    <button className='btn btn-secondary' onClick={ () => {setShowEditMenuModal(true)}}>
                      <EditIcon/>
                    </button>
                  </div>
                ) : null}
                {showEditMenuModal && (
                  <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Edit Menu Item</h5>
                          <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowEditMenuModal(false)}>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label className="form-label">Image URL</label>
                              <input
                              type="text"
                              className="form-control"
                              name="image_url"
                              value={newItem.image_url}
                              onChange={handleInputChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Name</label>
                              <input
                              type="text"
                              className="form-control"
                              name="name"
                              defaultValue={item.name}
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
                              name="item_type"
                              value={newItem.item_type}
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
                              name="preparation_time"
                              value={newItem.preparation_time}
                              onChange={handleInputChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Average Rating</label>
                              <input
                              type="number"
                              step="0.1"
                              className="form-control"
                              name="average_rating"
                              value={newItem.average_rating}
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
                          onClick={() => setShowEditMenuModal(false)}
                          >
                            Close
                          </button>
                          <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleEditMenuItem}
                          >
                            Edit Items
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
               
               
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
      <div className='row'>
        <div className='col-6'>
        {userType === 'manager' || userType === 'owner' ? (
        <button
          className="btn btn-primary mt-3"
          onClick={() => setShowModal(true)}
        >
          Add Menu Item
        </button>
      ) : null}
        </div>
        <div className='col-6'>
          <button className='btn btn-warning mt-3' onClick={handleOrders()}>
            Orders
          </button>

        </div>

      </div>
      

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
                      name="image_url"
                      value={newItem.image_url}
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
                      name="item_type"
                      value={newItem.item_type}
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
                      name="preparation_time"
                      value={newItem.preparation_time}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Average Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control"
                      name="average_rating"
                      value={newItem.average_rating}
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

export default RestaurantMenuPage;

