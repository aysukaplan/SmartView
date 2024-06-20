import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/SVLogo.png';
import './styles/expertqa/ExpertQA.css';
import pp from '../assets/pp.png';
import {useNavigate} from "react-router-dom";

const DiscussionPage = () => {
    const [questions, setQuestions] = useState([]);
    const [isSolved, setIsSolved] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        fetchUnansweredQuestions();
    }, []);

    const fetchUnansweredQuestions = async () => {
        try {
            const response = await axios.get('/api/v1/questions/unanswered');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching unanswered questions:', error);
        }
    };

    const toggleSolved = (questionId) => {
        setIsSolved((prevState) => ({
            ...prevState,
            [questionId]: !prevState[questionId],
        }));
    };
    const handleAskQuestion = async (e) => {
        e.preventDefault();
        navigate('/AddNewQA');
    };
    const renderQuestions = () => {
        return questions.map((question) => (
            <div key={question.id} className="discussion-post-container">
                <div className="discussion-post">
                    <div className="discussion-info">
                        <div className="user-info-discussion">
                            <div className="profile-image" style={{ backgroundImage: `url(${pp})` }}></div>
                            <div className="user-details">
                                <p>{question.author}</p>
                                <p>{question.createdAt}</p>
                                <p><span className="heart-icon">❤️</span> Likes</p>
                            </div>
                        </div>
                        <div className="expert-details">
                            <div>
                                <p>{question.title}</p>
                                <p>{question.createdAt}</p>
                                <button className={`solved-button-expert ${isSolved[question.id] ? 'solved' : 'unsolved'}`} onClick={() => toggleSolved(question.id)}>
                                    {isSolved[question.id] ? 'Solved' : 'Unsolved'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="container-expert">
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

            <div className="action-buttons-expert">
                <button className="orange-button">Solved Questions</button>
                <button className="orange-button">Unsolved Questions</button>
                <button onClick={handleAskQuestion} className='green-button'>+ Ask Question</button>

            </div>

            <div className="discussion-content">
                {renderQuestions()}
            </div>

            <div className="bottom-bar">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </div>
    );
};

export default DiscussionPage;
