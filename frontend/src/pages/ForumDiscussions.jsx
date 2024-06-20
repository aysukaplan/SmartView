import React, { useState } from 'react';
import logo from '../assets/SVLogo.png';
import './styles/forumdiscussions/ForumDiscussions.css';
import pp from '../assets/pp.png';

const profileImages = {
    User1: pp, 
    User2: pp,
    CurrentUser: pp, // Varsayılan resim
  };


const ForumDiscussions = () => {
    // Fake data for discussions
    const [discussions, setDiscussions] = useState([
      {
        id: 1,
        title: 'First Discussion',
        user: 'User1',
        date: '2024-05-18',
        comments: 3,
      },
      {
        id: 2,
        title: 'Second Discussion',
        user: 'User2',
        date: '2024-05-19',
        comments: 5,
      },
    ]);
  
    return (
      <div className="container-f">
        {/* Top menu */}
        <div className="top-menu">
          {/* Logo */}
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          
          {/* Menu options (Home, Recommend, Blog, Forum, Communities, ExpertQ&A) */}
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
          
          {/* Bookmarks and LogIn/Account buttons */}
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
  
        {/* Forum content */}
        <div className="forum-content">
          <h2>Forum Discussions</h2>
          <ul className="discussion-list">
            {discussions.map(discussion => (
              <li key={discussion.id} className="discussion-item">
                
                <div className="profile-image" style={{ backgroundImage: `url(${profileImages[discussion.user]})` }}></div>
                <div className="discussion-details"></div>
                <h3>{discussion.title}</h3>
                <p>Started by {discussion.user} on {discussion.date}</p>
                <p>{discussion.comments} comments</p>
              </li>
            ))}
          </ul>
  
          <div className="new-discussion-forum">
            <button>Add Discussion</button>
          </div>
        </div>
  
        {/* Bottom bar */}
        <div className="bottom-bar">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    );
  };
  
  export default ForumDiscussions;