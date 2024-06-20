import React, { useState } from 'react';
import './styles/adddiscussion/AddDiscussion.css';
import logo from '../assets/SVLogo.png';

const AddDiscussion = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [categories, setCategories] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('discussion_title', title);
    formData.append('discussion_text', text);
    formData.append('discussion_categories', categories);


    fetch('/submit_discussion', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div className="container-discussion">
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
        <h1>Add Discussion</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="discussion-title">Discussion Title</label>
            <input 
              type="text" 
              id="discussion-title" 
              name="discussion_title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="discussion-text">Text</label>
            <textarea 
              id="discussion-text" 
              name="discussion_text" 
              rows="10" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="discussion-categories">Add Categories</label>
            <input 
              type="text" 
              id="discussion-categories" 
              name="discussion_categories" 
              value={categories} 
              onChange={(e) => setCategories(e.target.value)} 
              placeholder="Separate categories with commas" 
            />
          </div>
          
          <button type="submit">Submit</button>
        </form>

          {/* Bottom bar */}
        <div className="bottom-bar">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
      </div>
      </div>
  );
};

export default AddDiscussion;