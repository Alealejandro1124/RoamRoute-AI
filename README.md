# RoamRoute AI

RoamRoute AI is a travel-assistant application designed to help users optimize their itineraries and discover local activities based on their preferences. The application leverages AI-driven suggestions to enhance the travel experience for frequent travelers, local adventurers, occasional vacationers, and digital nomads.

*** This Project was created initially with CoPilot but would not run properly. I switched over to chatGPT o3-mini-high to complete the project. ***

## Key Features

- **Unified Itinerary & Local Activity Optimization**: Users receive a single itinerary experience with AI-driven suggestions tailored to their schedule and preferences.
- **Immediate Private Feedback**: A simple thumbs up/down system for personal recommendations, along with anonymous community ratings to refine suggestions.

## Technologies Used

- **Frontend**: Next.js, TypeScript, React
- **Backend**: FastAPI (Python)
- **Database**: SQLite (for local testing) or PostgreSQL in production
- **AI/ML Frameworks**: TensorFlow or PyTorch, Hugging Face for NLP (future enhancements)
- **DevOps/CI/CD**: Docker, GitHub

## Getting Started

Below are instructions for a **fresh setup** if you have **no** Python venv or Node modules installed yet. We’ll walk through:

1. **Backend** environment setup, 
2. **Creating a database** (if needed),
3. **Generating an itinerary** via Swagger UI (for user_id=1),
4. **Frontend** environment setup and run.

### Prerequisites

- **Python** (3.8 or later)
- **Node.js** (v14 or later)
- **pip** (usually bundled with Python)
- **npm** (bundled with Node)
- **SQLite** (comes with Python, used by default)
- Optionally, **Docker** if you want to run via container

---

### Setup Instructions

1. **Clone the Repository**
   ```
   open preferred folder for cloning the repository
   git clone https://github.com/Alealejandro1124/RoamRoute-AI
   cd RoamRoute-AI
   ```

2. **Install Frontend Dependencies**
   ```
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```
   1. cd ../backend

   2. *** OPTIONAL BUT HIGHLY RECOMMENDED ***
    Create & Activate a Virtual Environment
     python -m venv venv
     # Windows:
     .\venv\Scripts\activate
     # macOS/Linux:
     source venv/bin/activate

   3. pip install -r requirements.txt
      *** This step can take a few minutes ***

   4. python init_db.py
       You should see "Database tables created successfully"
   ```

4. **Configure Environment Variables**
   ```
   - Create a `.env` file in the `backend` directory and add your database connection details and any other necessary environment variables.

   ** A .env file has been included for demo purposes **
   ```

5. **Run the Backend Server**
   ```
   uvicorn app.main:app --reload

   INFO:     Uvicorn running on http://127.0.0.1:8000
    -Will be displayed upon successfull startup
   
   http://127.0.0.1:8000 should display:
   {"message":"Welcome to RoamRoute AI!"}
   ```

6. **Run the Frontend Application**
   ```
   open a second powershell terminal
    *** Both Backend and Frontend need to run simultaneously ***
   
   cd ../frontend
   npm run dev
   ```

7. **Access the Application**
   ```
   Open your browser and navigate to `http://localhost:3000` to access the RoamRoute AI application.

   you should see "Loading your itinerary..."
   This is correct
   ```
8. **Create an itinerary in Backend**
   ```
   Open you browser and navigate to http://localhost:8000/docs#/

   1. Locate: /itinerary/{user_id}
   2. Press Try it out
   3. Enter 1 in the user_id field
   4. Press Execute
      In responspe body you should see an itinerary created.
   ```
9. **Refresh your Application Window**
   ```
   Access your http://localhost:3000` window/tab and refresh

   You should now see a very basic itiration of RoamRoute AI

   The feedback radio buttons are fully functional

   Username and location are hardcoded for demo purposes

   Activities are hard coded for demo purposes as live location
   has not been inigrated.
   ```

## Known Limitations

- The current MVP uses a mock AI logic for suggestions. Future iterations will integrate advanced AI models for better recommendations.


## Next Steps

- Implement advanced AI-driven suggestions using real-time data.

- Expand the feedback mechanism to include detailed comments, ratings, and communal feedback

- Preferred Navigation & Timely Notifications: An easy “Navigate” button that integrates with the user’s favorite map app, plus push notifications that remind users of departure times while considering traffic and weather.
- Filter Customization & Advanced Personalization: Users can control their preferences (likes/dislikes), allowing the AI to refine suggestions over time.
