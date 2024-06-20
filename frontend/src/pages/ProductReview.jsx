import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './styles/product/ProductReview.css';
import logo from '../assets/SVLogo.png';

const ProductReview = () => {
  const location = useLocation();
  const product = location.state?.product;
  const { user } = useContext(UserContext);

  const [currentImage, setCurrentImage] = useState(product?.imageUrl || '');
  const [thumbnailSize, setThumbnailSize] = useState(80); // Default thumbnail size

  if (!product) {
    return <div>No product details available.</div>;
  }

  const handleAddToWishlist = async () => {
    try {
      if (user && product) {
        console.log(`Adding product with ID ${product.id} to wishlist for user with ID ${user.id}`);
        await axios.post(`http://localhost:8080/api/v1/wishlist/add`, null, {
          params: {
            userId: user.id,
            productId: product.id,
          },
        });
        alert('Product added to wishlist');
      } else {
        alert('Please log in to add products to your wishlist');
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
    }
  };

  const reviews = [
    { id: 1, author: "Sarah", content: "Beautiful dress! Fits perfectly." },
    { id: 2, author: "John", content: "Great quality, fast shipping. Very satisfied." },
    { id: 3, author: "Emily", content: "Received many compliments when wearing this dress. Love it!" }
  ];

  const handleLeftArrowClick = () => {
    setCurrentImage(product.imageUrl); // Adjust if you have multiple images
  };

  const handleRightArrowClick = () => {
    setCurrentImage(product.imageUrl); // Adjust if you have multiple images
  };

  return (
    <div className="container-p">
      <div className="top-menu">
        <div className="logo">
          <img src={logo} alt="Logo" />
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

      <div className="main-content">
        <h1 className="product-title">
          {product.name}
          <button onClick={handleAddToWishlist} className="wishlist-button">★</button>
        </h1>
        <div className="product-container">
          <div className="arrows">
            <div className="arrow left-arrow" onClick={handleLeftArrowClick}>←</div>
          </div>
          <img src={currentImage} alt="Main Image" className="main-image" />
          <div className="arrows">
            <div className="arrow right-arrow" onClick={handleRightArrowClick}>→</div>
          </div>
          <div className="reviews">
            <h2>Product Reviews</h2>
            <ul>
              {reviews.map(review => (
                <li key={review.id}>
                  <p><strong>{review.author}:</strong> {review.content}</p>
                </li>
              ))}
            </ul>
            <div className="add-review-form">
              <input type="text" placeholder="Enter your review..." />
              <button className="add-review-button">Add Review</button>
            </div>
            {/* Display coupon code */}
            <div className="coupon-code">
              <h3>Coupon Code: {product.coupon ? product.coupon : 'There is no coupon'}</h3>
            </div>
          </div>
        </div>
        <div className="thumbnail-images">
          <img src={product.imageUrl} alt="Thumbnail Image" onClick={() => setCurrentImage(product.imageUrl)} style={{ width: thumbnailSize, height: thumbnailSize }} />
        </div>
        <div className="box">
          <div className="info">Merchant Information: {product.merchant_id}</div>
          <div className="info">Product Information: {product.description}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
