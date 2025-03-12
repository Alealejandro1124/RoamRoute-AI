import React, { useEffect, useState } from 'react';

const Itinerary = () => {
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch itinerary data from the backend API
        const fetchItinerary = async () => {
            try {
                const response = await fetch('/api/itinerary');
                const data = await response.json();
                setItinerary(data);
            } catch (error) {
                console.error('Error fetching itinerary:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItinerary();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Your Itinerary</h1>
            <ul>
                {itinerary.map((activity, index) => (
                    <li key={index}>
                        <h2>{activity.title}</h2>
                        <p>{activity.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Itinerary;