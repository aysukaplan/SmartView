import React, { useState } from 'react';
import './styles/addnewqa/AddNewQA.css';
import logo from '../assets/SVLogo.png';
import axios from 'axios';

const AddNewQA = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [categories, setCategories] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('qa_title', title);
    formData.append('qa_text', text);
    formData.append('qa_categories', categories);

    try {
      const response = await axios.post('/api/v1/questions/ask', {
        content: text,
        userId: 1, // Replace with actual user ID
      });
      console.log('Success:', response.data);
      // Clear form fields after successful submission
      setTitle("");
      setText("");
      setCategories("");

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="container-qa">
        <div className="top-menu">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="menu-options">
            <ul>
              <li>Home</li>
              <li>Recommend</li>
              <li>Blog</li>
              <li>Forum</li>
              <li>Communities</li>
              <li>ExpertQ&A</li>
            </ul>
          </div>
          <div className="user-options">
            <button className="bookmark-button"><span className="star-icon">★</span> Bookmarks
            </button>
            <button className="login-button">Log In / Account</button>
          </div>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
      </div>

      <div className="container">
        <h1>Add New Expert Q&A</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="qa-title">Q&A Title</label>
            <input 
              type="text" 
              id="qa-title" 
              name="qa_title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="qa-text">Text</label>
            <textarea 
              id="qa-text" 
              name="qa_text" 
              rows="10" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="qa-categories">Add Categories</label>
            <input 
              type="text" 
              id="qa-categories" 
              name="qa_categories" 
              value={categories} 
              onChange={(e) => setCategories(e.target.value)} 
              placeholder="Separate categories with commas" 
            />
          </div>

          <button onClick={handleSubmit}type="submit">Submit</button>
        </form>
 
    {/* Bottom bar */}
    <div className="bottom-bar">
    <p>&copy; 2024 Your Company. All rights reserved.</p>
  </div>
  </div>
  </div>

    
  );
};

export default AddNewQA;