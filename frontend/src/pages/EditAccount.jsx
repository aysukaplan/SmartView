import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './styles/EditAccount/EditAccount.css';

const EditAccount = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    newEmail: '',
    username: '',
    name: '',
    city: '',
    birthday: '',
    phoneNumber: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        newEmail: user.email,
        username: user.username,
        name: user.name,
        city: user.city,
        birthday: user.birthday,
        phoneNumber: user.phoneNumber
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateAccount = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/accounts/update-account', null, {
        params: {
          email: user.email,
          newEmail: formData.newEmail,
          username: formData.username,
          name: formData.name,
          city: formData.city,
          birthday: formData.birthday,
          phoneNumber: formData.phoneNumber
        }
      });

      if (response.status === 200) {
        setMessage('Account updated successfully.');
        setUser({ ...user, ...formData });
        navigate('/account');
      } else {
        setMessage('Account update failed. Please try again.');
      }
    } catch (error) {
      console.error('Error updating account:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="edit-account-container">
      <h2>Edit Account</h2>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="newEmail"
          value={formData.newEmail}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Birthday</label>
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      {message && <div className="message">{message}</div>}
      <button onClick={handleUpdateAccount}>Update Account</button>
    </div>
  );
};

export default EditAccount;
