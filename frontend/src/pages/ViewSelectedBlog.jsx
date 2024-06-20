import React, { useState, useEffect } from 'react';
import './styles/viewselectedblog/ViewSelectedBlog.css';
import logo from '../assets/SVLogo.png';
import pp from '../assets/pp.png';
import blogImage from '../assets/blog.jpg';
import Kdress from '../assets/Kdress.jpg';

const ViewSelectedBlog = () => {
    // Mock data for the selected blog
    const blogData = {
      title: "Blog Title",
      photos: [
        { id: 1, url: blogImage },
        { id: 2, url: Kdress },
        // Add more photo URLs if needed
      ],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      comments: [
        {
          id: 1,
          text: "Great blog post!",
          user: {
            username: "user1",
            profilePhoto: pp,
            postingDate: "May 1, 2024",
            rank: "Expert"
          }
        },
        {
            id: 2,
            text: "Another great comment!",
            user: {
              username: "user2",
              profilePhoto: pp,
              postingDate: "May 2, 2024",
              rank: "Intermediate"
            }
          },
      
    ]
};

const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex === blogData.photos.length - 1 ? 0 : prevIndex + 1));
};

const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex === 0 ? blogData.photos.length - 1 : prevIndex - 1));
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
              <button className="bookmark-button"><span className="star-icon">★</span> Bookmarks</button>
              <button className="login-button">Log In / Account</button>
            </div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
            </div>
            </div>
            <div className="view-selected-blog">
                <div className="user-info">
                    <img src={blogData.comments[0].user.profilePhoto} alt="User Profile" className="profile-photo" />
                    <div className="user-details">
                        <p>{blogData.comments[0].user.username}</p>
                        <p>{blogData.comments[0].user.postingDate}</p>
                        <p>Rank: {blogData.comments[0].user.rank}</p>
                    </div>
                </div>
                <h1>{blogData.title}</h1>
                <div className="photo-section">
                <div className="main-photo">
                        <img src={blogData.photos[currentPhotoIndex].url} alt="Main Photo" />
                        <div className="arrow left-arrow" onClick={prevPhoto}></div>
                        <div className="arrow right-arrow" onClick={nextPhoto}></div>
                    </div>
                    <div className="small-photos">
                        {blogData.photos.map((photo, index) => (
                            <img key={photo.id} src={photo.url} alt={`Photo ${index + 1}`} className={index === 0 ? 'active' : ''} />
                        ))}
                    </div>
                </div>
                <div className="text-container">
                <p>{blogData.text}</p>
            </div>
                <div className="comments-section">
                    <h2>Comments</h2>
                    {blogData.comments.map(comment => (
                        <div key={comment.id} className="comment">
                            <p><span className="comment-icon">+</span> {comment.text}</p>
                        </div>
                        
                    ))}
                </div>
                
            {/* Bottom bar */}
        <div className="bottom-bar">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
      </div>
      </div>
  );
};

export default ViewSelectedBlog;