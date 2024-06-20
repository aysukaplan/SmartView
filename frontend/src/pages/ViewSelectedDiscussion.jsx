import React, { useState } from 'react';
import logo from '../assets/SVLogo.png';
import './styles/viewselecteddiscussion/ViewSelectedDiscussion.css';
import pp from '../assets/pp.png';

const ViewSelectedDiscussion = () => {
  return (
    <div className="container-viewdis">
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

        <h2 className="discussion-title">Discussion Title</h2>
        

      {/* Blog İçeriği */}
      <div className="discussion-content">
        {/* Örnek bir blog gönderisi */}
        <div className="discussion-post-container">
  <div className="discussion-post">
    <div className="discussion-info">
      {/* Kullanıcı bilgileri */}
      <div className="user-info-discussion">
        {/* Profil resmi */}
        <div className="profile-image" style={{ backgroundImage: `url(${pp})` }}></div>
        {/* Kullanıcı adı, tarih ve beğeni sayısı */}
        <div className="user-details">
          <p>JohnDoe</p> {/* Örnek kullanıcı adı */}
          <p>May 12, 2024</p> {/* Örnek tarih */}
          <p><span className="heart-icon">❤️</span> Likes</p> 
        </div>
      </div>
      {/* Blog başlığı ve içeriği */}
      <div className="discussion-details">
        <div>
          <p>Text</p>
          <button>Answer</button>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Örnek ikin blog gönderisi */}
        <div className="discussion-post-container">
  <div className="discussion-post">
    <div className="discussion-info">
      {/* Kullanıcı bilgileri */}
      <div className="user-info-discussion">
        {/* Profil resmi */}
        <div className="profile-image" style={{ backgroundImage: `url(${pp})` }}></div>
        {/* Kullanıcı adı, tarih ve beğeni sayısı */}
        <div className="user-details">
          <p>JaneDoe</p> {/* Örnek kullanıcı adı */}
          <p>May 12, 2024</p> {/* Örnek tarih */}
          <p><span className="heart-icon">❤️</span> Likes</p> 
        </div>
      </div>
      {/* Blog başlığı ve içeriği */}
      <div className="discussion-details">
        <div>
          <p>Text</p>
          <button>Answer</button>
        </div>
      </div>
    </div>
  </div>
</div>
        

    {/* Bottom bar */}
    <div className="bottom-bar">
    <p>&copy; 2024 Your Company. All rights reserved.</p>
  </div>
  </div>
</div>
  );
};

export default ViewSelectedDiscussion;