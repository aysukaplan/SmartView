import React, { useState, useEffect  } from 'react';
import logo from '../assets/SVLogo.png';
import './styles/viewadminaccount/ViewAdminAccount.css';

const ViewAdminAccount = () => {
    return (
      <div className="container-admin">
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
            <button className="bookmark-button">
              <span className="star-icon">★</span> Bookmarks
            </button>
            <button className="login-button">Log In / Account</button>
          </div>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
  
        <div className="account-info-admin">
            <div className="account-header">
                    <h2>My Account</h2>
                </div>
                <div className="account-field">
                    <label>E-mail:</label>
                    <input type="email" value="user@example.com" readOnly />

                    <label>Name:</label>
                    <input type="text" value="Jane Doe" readOnly />

                    <label>Birthday:</label>
                    <input type="date" value="1990-01-01" readOnly />

                    <label>City:</label>
                    <input type="text" value="Istanbul" readOnly />

                    <label>Phone:</label>
                    <input type="tel" value="+90 555 555 55 55" readOnly />

                    <label>Password:</label>
                    <input type="password" value="********" readOnly />
                </div>
            </div>
  
            <div className="action-buttons-admin">
                <button className="orange-button">Manag Users / Authorize user - Take back authority</button>
                <button className="red-button">Update System</button>
                <button className="red-button">Delete Account</button>
                <button className="red-button">Ban User</button>
                <button className="red-button">System feedback / Errors / Reviews</button>
                <button className="orange-button">Reset Password</button>
                <button className="orange-button">Edit Profile</button>
                <button className="orange-button">Log Out</button>
            </div>
      </div>
    );
  };
  
  export default ViewAdminAccount;