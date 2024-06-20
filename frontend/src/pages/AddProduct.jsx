import React, { useState } from 'react';
import axios from 'axios';
import './styles/AddProduct/AddProduct.css'; // Import the CSS file

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [merchantId, setMerchantId] = useState(1);
  const [images, setImages] = useState([]);

  console.log('AddProduct component rendered');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('merchant_id', merchantId); // Ensure consistency with backend naming

    // Append each image with the same key 'images'
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:8080/api/v1/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product added:', response.data);

      // Clear form fields after successful submission
      setName('');
      setDescription('');
      setCategory('');
      setMerchantId(1);
      setImages([]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  return (
      <div>
        <h1>Add New Product</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          <input type="file" multiple onChange={handleImageChange} required />
          <button type="submit">Add Product</button>
        </form>
      </div>
  );
};

export default AddProduct;
