import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './styles/homepage/HomePage.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/SVLogo.png';

const WishlistPage = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (user) {
          const response = await axios.get(`http://localhost:8080/api/v1/wishlist/user/${user.id}`);
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
      }
    };

    fetchWishlist();
  }, [user]);

  const handleProductClick = (product) => {
    console.log("Redirecting to selected product", product);
    navigate('/product', { state: { product } });
  };

  const handleFeedbackClick = () => {
    navigate('/addfeedback');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  // localStorage'da kullanıcı bilgilerini kontrol eden fonksiyon
  const isLoggedIn = () => {
    return localStorage.getItem('user') !== null;
  };

  return (
    <div className='homepage-container'>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="nav-links">
          <Link to="/homePage">Home</Link>
          <Link to='/recommend'>Recommend</Link>
          <Link to='/blogPage'>Blog</Link>
          <Link to='/ForumDiscussions'>Forum</Link>
          <Link to='/communities'>Communities</Link>
          <Link to='/expert-q-and-a'>Expert Q&A</Link>
          <Link to='/bookmarks' className='right-link'>Bookmarks</Link>
          {isLoggedIn() ? (
            <Link to='/account' className='right-link'>Account</Link>
          ) : (
            <Link to='/login' className='right-link'>Login/Register</Link>
          )}
        </nav>
      </div>
      <main className='main-content'>
        <h1>My Bookmarks</h1>
        <div className='products'>
          {products.length > 0 ? (
            products.map(product => (
              <div className='product' key={product.id} onClick={() => handleProductClick(product)}>
                <img src={product.imageUrl || 'default_image.jpg'} alt={product.name} />
                <div className='product-info'>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Category: {product.category}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No bookmarks found.</p>
          )}
        </div>
      </main>
      <footer className='footer'>
        <p>&copy; 2024 Code Quintet. All rights reserved.</p>
        <div className="buttons-container">
          <button onClick={handleAboutClick} className='about-button'>About</button>
          <button onClick={handleFeedbackClick} className='feedback-button'>Feedback</button>
        </div>
      </footer>
    </div>
  );
};

export default WishlistPage;
