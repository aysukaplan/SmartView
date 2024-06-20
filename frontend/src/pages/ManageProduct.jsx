import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './styles/manageProduct/ManageProduct.css';
import { useNavigate } from 'react-router-dom';

const ManageProduct = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [couponText, setCouponText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user) {
          const response = await axios.get(`http://localhost:8080/api/v1/products/merchant/${user.id}`);
          setProducts(response.data);
        }
      } catch (error) {
        console.error('There was an error fetching the products!', error);
      }
    };

    fetchProducts();
  }, [user]);

  const addProduct = () => {
    navigate("/addproduct");
  };

  const editProduct = (id) => {
    navigate('/edit-product', { state: { productId: id } });
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('There was an error deleting the product!', error);
    }
  };

  const addCoupon = (id) => {
    setCurrentProductId(id);
    setShowCouponInput(true);
  };

  const saveCoupon = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/products/${currentProductId}/coupon`, { coupon: couponText });
      setShowCouponInput(false);
      setCouponText('');
      setCurrentProductId(null);
      alert('Coupon added successfully!');
    } catch (error) {
      console.error('There was an error adding the coupon!', error);
    }
  };

  return (
    <div className="manage-products">
      <div className="header">
        <button className="add-button" onClick={addProduct}>+ Add New Product</button>
      </div>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-name">{product.name}</div>
            <div className="product-description">{product.description}</div>
            <div className="product-price">{product.price} TL</div>
            <button className="edit-button" onClick={() => editProduct(product.id)}>Edit product</button>
            <button className="coupon-button" onClick={() => addCoupon(product.id)}>Add Coupon</button>
            <button className="delete-button" onClick={() => deleteProduct(product.id)}>Delete product</button>
          </div>
        ))}
      </div>
      {showCouponInput && (
        <div className="coupon-input-container">
          <input
            type="text"
            placeholder="Enter coupon text"
            value={couponText}
            onChange={(e) => setCouponText(e.target.value)}
          />
          <button className="save-coupon-button" onClick={saveCoupon}>Save Coupon</button>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
