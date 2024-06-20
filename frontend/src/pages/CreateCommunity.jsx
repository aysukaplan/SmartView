import React, { useState } from 'react';
import logo from '../assets/SVLogo.png';
import './styles/createcommunity/CreateCommunity.css';
import { addCommunity } from '../api/community/communityservice';

const CreateCommunity = () => {
  const [communities, setCommunities] = useState([]);
  const [newCommunityName, setNewCommunityName] = useState('');

  const handleAddCommunity = async () => {
    try {
      const newCommunity = await addCommunity(newCommunityName);
      setCommunities([...communities, newCommunity]);
      setNewCommunityName('');
    } catch (error) {
      console.error('Error adding community:', error);
    }
  };

  return (
    <div className="container-cc">
      {/* Üst Menü */}
      <div className="top-menu">
        {/* Logo */}
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        
        {/* Menü Seçenekleri */}
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
        
        {/* Kullanıcı Seçenekleri */}
        <div className="user-options">
          <button className="bookmark-button"><span className="star-icon">★</span> Bookmarks</button>
          <button className="login-button">Log In / Account</button>
        </div>
      </div>

      {/* Search bar */}
      <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
      </div>

      {/* '+New Community tuşu */}
      <div className="new-community-button">
        <input 
          type="text" 
          placeholder="Enter a community name" 
          value={newCommunityName}
          onChange={(e) => setNewCommunityName(e.target.value)}
        />
        <button onClick={handleAddCommunity}>Add</button>
      </div>

      {/* Bottom bar */}
      <div className="bottom-bar">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
  );
};

export default CreateCommunity;
