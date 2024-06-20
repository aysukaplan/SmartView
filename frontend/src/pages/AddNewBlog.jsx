import React, { useState } from 'react';
import './styles/addnewblog/AddNewBlog.css';
import logo from '../assets/SVLogo.png';

const AddNewBlog = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [categories, setCategories] = useState('');
  const [photos, setPhotos] = useState([]);

  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('blog_title', title);
    formData.append('blog_text', text);
    formData.append('blog_categories', categories);

    photos.forEach((photo, index) => {
      formData.append(`blog_photos_${index}`, photo);
    });

    fetch('/submit_blog', {
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
      <div className="container-b">
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
        <h1>Add New Blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="blog-title">Blog Title</label>
            <input 
              type="text" 
              id="blog-title" 
              name="blog_title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="blog-text">Text</label>
            <textarea 
              id="blog-text" 
              name="blog_text" 
              rows="10" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="blog-categories">Add Categories</label>
            <input 
              type="text" 
              id="blog-categories" 
              name="blog_categories" 
              value={categories} 
              onChange={(e) => setCategories(e.target.value)} 
              placeholder="Separate categories with commas" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="blog-photos">Add Photos</label>
            <input 
              type="file" 
              id="blog-photos" 
              name="blog_photos" 
              multiple 
              onChange={handlePhotoChange} 
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

export default AddNewBlog;