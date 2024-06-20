import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './styles/EditProduct/EditProduct.css';

const EditProduct = () => {
  const { state } = useLocation();
  const { productId } = state;
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState({ name: '', description: '', price: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/v1/products/${productId}`, product);
      navigate('/manageproduct'); // ManageProduct sayfasına yönlendir
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input type="text" name="description" value={product.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </div>
        <button type="submit" className="btn-save">Save</button>
      </form>
    </div>
  );
};

export default EditProduct;
