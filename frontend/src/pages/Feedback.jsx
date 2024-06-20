import React, { useState } from 'react';
import axios from 'axios';
import './styles/feedback/AddFeedback.css'; // Import CSS for styling

const Feedback = () => {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/v1/feedbacks/submit', { text: feedback });
            console.log('Feedback submitted:', response.data);

            // Clear the feedback text box after successful submission
            setFeedback('');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div className='feedback-container'>
            <h1>Submit Feedback</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder='Enter your feedback...'
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Feedback;
