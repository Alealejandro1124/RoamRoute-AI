# RoamRoute AI

RoamRoute AI is a travel-assistant application designed to help users optimize their itineraries and discover local activities based on their preferences. The application leverages AI-driven suggestions to enhance the travel experience for frequent travelers, local adventurers, occasional vacationers, and digital nomads.

## Key Features

- **Unified Itinerary & Local Activity Optimization**: Users receive a single itinerary experience with AI-driven suggestions tailored to their schedule and preferences.
- **Immediate Private Feedback & Communal Reviews**: A simple thumbs up/down system for personal recommendations, along with anonymous community ratings to refine suggestions.
- **Preferred Navigation & Timely Notifications**: An easy “Navigate” button that integrates with the user’s favorite map app, plus push notifications that remind users of departure times while considering traffic and weather.
- **Filter Customization & Advanced Personalization**: Users can control their preferences (likes/dislikes), allowing the AI to refine suggestions over time.

## Technologies Used

- **Frontend**: Next.js, TypeScript, React
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL (RDS), optional NoSQL (DynamoDB)
- **AI/ML Frameworks**: TensorFlow or PyTorch, Hugging Face for NLP
- **Cloud Infrastructure**: AWS (ECS/Fargate, EKS, or EC2)
- **DevOps/CI/CD**: Docker, GitHub, Jenkins or AWS CodePipeline

## Getting Started

To run the RoamRoute AI application locally, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- Python (v3.8 or later)
- PostgreSQL (or SQLite for simplicity)
- Docker (optional, for containerized setup)

### Setup Instructions

1. **Clone the Repository**
   ```
   git clone https://github.com/yourusername/roamroute-ai.git
   cd roamroute-ai
   ```

2. **Install Frontend Dependencies**
   ```
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```
   cd backend
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**
   - Create a `.env` file in the `backend` directory and add your database connection details and any other necessary environment variables.

5. **Run the Backend Server**
   ```
   cd backend
   uvicorn app.main:app --reload
   ```

6. **Run the Frontend Application**
   ```
   cd frontend
   npm run dev
   ```

7. **Access the Application**
   Open your browser and navigate to `http://localhost:3000` to access the RoamRoute AI application.

## Known Limitations

- The current MVP uses a mock AI logic for suggestions. Future iterations will integrate advanced AI models for better recommendations.
- Push notifications are simulated and not fully implemented in this version.

## Next Steps

- Implement advanced AI-driven suggestions using real-time data.
- Enhance user authentication with OAuth or JWT.
- Expand the feedback mechanism to include detailed comments and ratings.

Feel free to contribute to the project by submitting issues or pull requests!