import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './styles/AccountPage/AccountPage.css';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const { user, setUser, logout } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const storedEmail = localStorage.getItem('userEmail'); // Get email from local storage
        if (storedEmail) {
          const response = await axios.get(`http://localhost:8080/api/v1/users/status`, {
            params: { email: storedEmail }
          });
          const userData = response.data;
          if (userData.status) {
            setUser(userData);
          } else {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
        setLoading(false);
      } catch (error) {
        console.error('Error checking user status:', error);
        setLoading(false);
        navigate("/login");
      }
    };

    checkUserStatus();
  }, [navigate, setUser]);

  const handleLogout = async () => {
    try {
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
        await axios.post('http://localhost:8080/api/v1/users/logout', null, {
          params: { email: storedEmail }
        });
        setUser(null);
        localStorage.removeItem('userEmail');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
    navigate("/homepage");
  };

  const handleDeleteAccount = async () => {
    try {
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
        await axios.delete('http://localhost:8080/api/v1/users/delete', {
          params: { email: storedEmail }
        });
        setUser(null);
        localStorage.removeItem('userEmail');
        navigate("/homepage");
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleManageProductButton = async () => {
    try {
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
        const response = await axios.get(`http://localhost:8080/api/v1/users/role`, {
          params: { email: storedEmail }
        });
        const userRole = response.data;
        if (userRole === 2) {
          navigate("/manageproduct");
        } else {
          setErrorMessage("You do not have the authority to do this. You must be a merchant.");
        }
      } else {
        navigate("/account");
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      setErrorMessage("An error occurred while checking user role. Please try again.");
    }
  };

  const handleEditAccount = () => {
    navigate("/edit-account");
  };

  const handleBecomeMerchant = async () => {
    try {
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
        const response = await axios.get(`http://localhost:8080/api/v1/users/role`, {
          params: { email: storedEmail }
        });
        const userRole = response.data;
        if (userRole === 2) {
          setErrorMessage("You are already a merchant.");
        } else if (userRole === 3) {
          setErrorMessage("You are an admin.");
        } else if (userRole === 1 || userRole === 4) {
          setShowConfirmation(true);
        } else {
          setErrorMessage("You do not have the authority to become a merchant.");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      setErrorMessage("An error occurred while checking user role. Please try again.");
    }
  };

  const confirmBecomeMerchant = async () => {
    try {
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
        const response = await axios.post(`http://localhost:8080/api/v1/users/update-role`, null, {
          params: { email: storedEmail, newRole: 2 }
        });
        setUser(prevUser => ({ ...prevUser, role: 2 }));
        setShowConfirmation(false);
        setErrorMessage("You are now a merchant.");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      setErrorMessage("An error occurred while updating user role. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="account-container">
      <header className="header">
        <div className="logo">LOGO</div>
        <nav className="nav-links">
          <a href="/HomePage">Home</a>
          <a href="/recommend">Recommend</a>
          <a href="/BlogPage">Blog</a>
          <a href="/ForumDiscussion">Forum</a>
          <a href="/communities">Communities</a>
          <a href="/expert-q-and-a">Expert Q&A</a>
          <a href="/bookmarks" className="right-link">Bookmarks</a>
          <a href="/account" className="right-link">My Account</a>
        </nav>
      </header>

      <main className="main-content">
        <h2>My account</h2>
        <div className="account-info">
          <div className="info-item">
            <span>Name:</span> <span>{user.name}</span>
          </div>
          <div className="info-item">
            <span>Username:</span> <span>{user.username}</span>
          </div>
          <div className="info-item">
            <span>E-mail:</span> <span>{user.email}</span>
          </div>
          <div className="info-item">
            <span>Password:</span> <span>{user.password}</span>
          </div>
          <div className="info-item">
            <span>Phone:</span> <span>{user.phoneNumber}</span>
          </div>
          <div className="info-item">
            <span>Birthday:</span> <span>{user.birthday}</span>
          </div>
          <div className="info-item">
            <span>City:</span> <span>{user.city}</span>
          </div>
        </div>
        <div className="rank">
          <span>Rank</span>
        </div>
        <div className="actions">
          <button className="btn btn-ManageProduct" onClick={handleManageProductButton}>Manage Product</button>
          <button className="btn" onClick={handleEditAccount}>Edit profile</button>
          <button className="btn" onClick={handleLogout}>Log out</button>
          <button className="btn btn-delete" onClick={handleDeleteAccount}>Delete account</button>
          <button className="btn become-merchant" onClick={handleBecomeMerchant}>Become a Merchant</button>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {showConfirmation && (
          <div className="confirmation-dialog">
            <p>Are you sure you want to become a merchant?</p>
            <button className="btn" onClick={confirmBecomeMerchant}>Yes</button>
            <button className="btn" onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AccountPage;
