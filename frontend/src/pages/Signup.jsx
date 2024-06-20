import React, { useState } from 'react';
import './styles/signup/Signup.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import user_icon from '../assets/person.png';
import birthday_icon from '../assets/birthday.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import phone_icon from '../assets/phone.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState(new Date());
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault(); // Formun varsayılan submit davranışını durdur

        // Tarihi uygun bir formata dönüştür
        const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD formatı

        try {
            const response = await axios.post('http://localhost:8080/api/v1/users/register', null, {
                params: {
                    name,
                    username,
                    city,
                    phoneNumber: phone,
                    birthday: formattedDate,
                    email,
                    password,
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 201) {
                console.log('Signup successful');
                // Başarılı kayıt işleminden sonra kullanıcıyı homepage'e yönlendirin
                navigate('/homepage');
            } else {
                console.log('Signup failed');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    console.log('Bad Request');
                } else if (error.response.status === 409) {
                    console.log('User Already Exists');
                }
            }
            console.error('Error occurred:', error);
        }
    };

    return (
        <div className="container">
            <form>
                <div className="header">
                    <div className="text">Sign up</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={birthday_icon} alt="" />
                        <DatePicker selected={date} onChange={(date) => setDate(date)} />
                    </div>
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={phone_icon} alt="" />
                        <input type="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
                <div className="submit-container">
                    <button type="submit" className="submit" onClick={handleSignup}>Sign-up</button>
                </div>
                <h3>Do you have an Account?</h3>
                <div className="submit-container">
                    <button type="submit" className="submit" onClick={() => navigate('/login')}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
