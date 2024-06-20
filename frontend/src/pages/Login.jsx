import React, { useState, useContext } from 'react';
import './styles/login/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSignUpClick = () => {
    console.log("Sign Up button clicked!");
    navigate("/register");
  };

  const handleLogin = async () => {
    setErrorMessage(""); // Clear any existing error messages
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/users/login`, null, {
        params: {
          email,
          password
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200 && response.data) {
        console.log("Login successful");
        // Set user context and store email in localStorage
        setUser(response.data);
        localStorage.setItem('userEmail', email);
        // Redirect to account page after successful login
        navigate("/homepage");
      } else {
        console.log('Login failed');
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Password is not correct.");
        } else if (error.response.status === 404) {
          setErrorMessage("User not found.");
        }
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className='container'>
      <div className="inputs">
        <div className="input">
          <div className="rectangle">
            <input value={email} type="email" placeholder="email" className="input-field" onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="input">
          <div className="rectangle">
            <input value={password} type="password" placeholder="password" className="input-field" onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="submit-container">
        <button className="submit" onClick={handleLogin}>Log in</button>
      </div>

      <div className="signup-message">
        <p>Don't you have an account?</p>
        <button className="signup" onClick={handleSignUpClick}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
