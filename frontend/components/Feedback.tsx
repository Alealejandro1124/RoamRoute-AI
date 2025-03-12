import React, { useState } from 'react';

const Feedback: React.FC<{ activityId: string }> = ({ activityId }) => {
    const [feedback, setFeedback] = useState<string | null>(null);

    const handleFeedback = (value: string) => {
        setFeedback(value);
        // Here you would typically send the feedback to the backend
        console.log(`Feedback for activity ${activityId}: ${value}`);
    };

    return (
        <div className="feedback-container">
            <h3>Feedback on Activity {activityId}</h3>
            <div className="feedback-buttons">
                <button onClick={() => handleFeedback('thumbs_up')}>👍</button>
                <button onClick={() => handleFeedback('thumbs_down')}>👎</button>
            </div>
            {feedback && <p>Your feedback has been recorded: {feedback}</p>}
        </div>
    );
};

export default Feedback;