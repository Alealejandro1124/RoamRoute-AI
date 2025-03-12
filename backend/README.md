# RoamRoute AI Backend README

# RoamRoute AI Backend

## Overview
RoamRoute AI is a travel-assistant application designed to provide users with a unified itinerary experience, AI-driven suggestions for local activities, and a feedback mechanism to refine recommendations. This backend component is built using FastAPI and serves as the API layer for the application.

## Key Features
- **User Authentication**: Simple signup and login functionality to manage user profiles.
- **Itinerary Management**: Generate and retrieve itineraries based on user preferences.
- **Feedback System**: Users can provide feedback on suggested activities using a thumbs up/down mechanism.
- **AI-Driven Suggestions**: Simulated AI logic to suggest local activities based on user preferences.

## Technologies Used
- **FastAPI**: A modern web framework for building APIs with Python.
- **PostgreSQL**: Used for storing user data, itineraries, and feedback.
- **SQLite**: For local development and testing (optional).
- **Docker**: For containerization and easy deployment.
- **Python**: The programming language used for backend development.

## Installation

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)
- Docker (optional, for containerization)

### Setup Instructions
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/roamroute-ai.git
   cd roamroute-ai/backend
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. (Optional) If using Docker, build the Docker image:
   ```
   docker build -t roamroute-ai-backend .
   ```

4. Run the FastAPI application:
   ```
   uvicorn app.main:app --reload
   ```

5. (Optional) If using Docker, run the container:
   ```
   docker run -p 8000:8000 roamroute-ai-backend
   ```

## Accessing the API
Once the server is running, you can access the API at `http://localhost:8000`. The API documentation is available at `http://localhost:8000/docs`.

## Known Limitations
- The AI-driven suggestions are currently simulated and do not integrate with real-time data sources.
- User authentication is basic and does not include advanced security features.

## Next Steps
- Integrate advanced AI models for better activity suggestions.
- Implement multi-day itinerary planning.
- Enhance the feedback mechanism with more detailed analytics.

## Contribution
Feel free to contribute to the project by submitting issues or pull requests. Your feedback and suggestions are welcome!