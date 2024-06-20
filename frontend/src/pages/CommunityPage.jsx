import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/SVLogo.png';
import './styles/CommunityPage/CommunityPage.css';
import pp from '../assets/pp.png';
import {
  addUserToCommunity,
  getAllCommunities // Import the new function
} from '../api/community/communityservice';

const CommunityPage = () => {
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const data = await getAllCommunities();
        setCommunities(data);
      } catch (error) {
        console.error('Failed to fetch communities:', error);
      }
    };

    fetchCommunities();
  }, []);

  const isLoggedIn = () => {
    console.log(localStorage.getItem('user'));
    return localStorage.getItem('user') !== null;
  };

  const handleNavigateToCreateCommunity = () => {
    navigate('/CreateCommunity');
  };

  const handleJoinCommunity = async (communityId) => {
    console.log(communityId);
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.id);
    try {
      const response = addUserToCommunity(communityId, user.id);
      const data = await getAllCommunities();
      setCommunities(data);
    } catch (error) {
      console.error('Failed to join community:', error);
    }
  };

  return (
    <div className="container-c">
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
          <button className="bookmark-button"><span className="star-icon">★</span> Bookmarks</button>
          {isLoggedIn() ? (
                <button className="login-button">Account</button>
            ) : (
              <button className="login-button">Log In</button>
            )}
        </div>
      </div>
      <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
      </div>
      <button className="new-community-button" onClick={handleNavigateToCreateCommunity}>+ New Community</button>
      <div className="community-content">
        {communities.map((community) => (
          <div key={community.communityId} className="community-box" onClick={() => handleJoinCommunity(parseInt(community.communityId))}>
            <div className="community-info">
              <h3>{community.name}</h3>
              <p>Users: {community.users.length}</p>
            </div>
            <button className="join-button">Join</button>
          </div>
        ))}
      </div>
      <div className="bottom-bar">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
  );
};

export default CommunityPage;
