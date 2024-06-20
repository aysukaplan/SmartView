import React, { useEffect, useState } from 'react';
import './styles/homepage/HomePage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/SVLogo.png';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    console.log("Redirecting to selected product", product);
    navigate('/product', { state: { product } });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/products/browse?name=${searchQuery}`);
      setSearchResults(response.data.content); // Assuming the response contains an array of products
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleFeedbackClick = () => {
    navigate('/addfeedback');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  // localStorage'da kullanıcı bilgilerini kontrol eden fonksiyon
  const isLoggedIn = () => {
    console.log(localStorage.getItem('user'));
    return localStorage.getItem('user') !== null;
  };

  useEffect(() => {
    // fetching products
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/products/all');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
            <Link to='/expertqa'>Expert Q&A</Link>
            <Link to='/bookmarks' className='right-link'>Bookmarks</Link>
            {isLoggedIn() ? (
                <Link to='/account' className='right-link'>Account</Link>
            ) : (
                <Link to='/login' className='right-link'>Login/Register</Link>
            )}
          </nav>
        </div>
        <main className='main-content'>
          <div className='search-box'>
            <input
                type='text'
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className='products'>
            {searchResults.length > 0 ? (
                searchResults.map(product => (
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

export default HomePage;
