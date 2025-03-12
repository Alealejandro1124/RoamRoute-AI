import React, { useEffect, useState } from 'react';
import { apiFetch } from './_app';

// 1) Full dictionary from your itinerary.py, stored locally
const localSuggestions = {
  "Breakfast": [
    { time: "7-8am", activity: "Breakfast", suggestion: "Try avocado toast with fresh juice at The Green Table.", location: "Uptown" },
    { time: "7-8am", activity: "Breakfast", suggestion: "Savor a stack of blueberry pancakes at Pancake Paradise.", location: "Maple Street" },
    { time: "7-8am", activity: "Breakfast", suggestion: "Indulge in a continental breakfast at The Grand Hotel.", location: "Central Plaza" },
    { time: "7-8am", activity: "Breakfast", suggestion: "Sample a vegan breakfast bowl at Healthy Bites.", location: "Eco District" },
    { time: "7-8am", activity: "Breakfast", suggestion: "Relish classic eggs benedict at Brunch Club.", location: "Old Town" },
    { time: "7-8am", activity: "Breakfast", suggestion: "Enjoy croissants and café au lait at French Corner.", location: "Parisian Lane" },
    { time: "7-8am", activity: "Breakfast", suggestion: "Taste an exotic fusion breakfast at Spice Route.", location: "Chinatown" },
    { time: "7-8am", activity: "Breakfast", suggestion: "Dig into a savory breakfast burrito at Taco Sunrise.", location: "Mexican Market" },
    { time: "7-8am", activity: "Breakfast", suggestion: "Have a protein-packed smoothie bowl at Fit Fuel.", location: "Gym District" },
    { time: "7-8am", activity: "Breakfast", suggestion: "Feast on a full English breakfast at The Royal Diner.", location: "Kings Road" }
  ],
  "Early Morning Activity": [
    { time: "8:30-11:30am", activity: "Early Morning Activity", suggestion: "Join a sunrise hot air balloon ride.", location: "Skyview Park" },
    { time: "8:30-11:30am", activity: "Early Morning Activity", suggestion: "Take a kayaking trip along the river.", location: "Riverfront" },
    { time: "8:30-11:30am", activity: "Early Morning Activity", suggestion: "Embark on a guided jogging tour of the park.", location: "Green Park" },
    { time: "8:30-11:30am", activity: "Early Morning Activity", suggestion: "Enjoy a peaceful meditation session outdoors.", location: "Zen Garden" },
    { time: "8:30-11:30am", activity: "Early Morning Activity", suggestion: "Take a scenic segway tour by the water.", location: "Harborfront" },
    { time: "8:30-11:30am", activity: "Early Morning Activity", suggestion: "Join a group cycling adventure.", location: "Bikeway Trail" },
    { time: "8:30-11:30am", activity: "Early Morning Activity", suggestion: "Go birdwatching in a local nature reserve.", location: "Woodland Park" },
    { time: "8:30-11:30am", activity: "Early Morning Activity", suggestion: "Discover street art on an urban walking tour.", location: "Creative District" },
    { time: "8:30-11:30am", activity: "Early Morning Activity", suggestion: "Participate in a morning photography workshop.", location: "Old Town" },
    { time: "8:30-11:30am", activity: "Early Morning Activity", suggestion: "Relax with a Tai Chi session at dawn.", location: "Serenity Gardens" }
  ],
  "Lunch": [
    { time: "12-1pm", activity: "Lunch", suggestion: "Savor gourmet tacos at the Food Fiesta Truck.", location: "Central Plaza" },
    { time: "12-1pm", activity: "Lunch", suggestion: "Indulge in a handcrafted gourmet burger at Burger Loft.", location: "Downtown" },
    { time: "12-1pm", activity: "Lunch", suggestion: "Enjoy a fresh salad and artisan bread at Garden Bistro.", location: "Sunset Avenue" },
    { time: "12-1pm", activity: "Lunch", suggestion: "Taste Mediterranean flavors at Olive & Thyme.", location: "Harborfront" },
    { time: "12-1pm", activity: "Lunch", suggestion: "Relish a spicy ramen bowl at Noodle House.", location: "Chinatown" },
    { time: "12-1pm", activity: "Lunch", suggestion: "Grab a delicious wrap from the Urban Kitchen Food Cart.", location: "Market Square" },
    { time: "12-1pm", activity: "Lunch", suggestion: "Dig into a classic club sandwich at Deli Delight.", location: "Downtown" },
    { time: "12-1pm", activity: "Lunch", suggestion: "Enjoy a poke bowl at Island Fresh.", location: "Beachside" },
    { time: "12-1pm", activity: "Lunch", suggestion: "Feast on wood-fired pizza at Rustic Oven.", location: "Old Town" },
    { time: "12-1pm", activity: "Lunch", suggestion: "Sample fusion cuisine at the Trendy Food Lab.", location: "Innovation District" }
  ],
  "Afternoon Activity": [
    { time: "1:30-5:30pm", activity: "Afternoon Activity", suggestion: "Explore an immersive interactive art exhibit.", location: "Creative Hub" },
    { time: "1:30-5:30pm", activity: "Afternoon Activity", suggestion: "Join a local cooking class to learn regional recipes.", location: "Culinary Studio" },
    { time: "1:30-5:30pm", activity: "Afternoon Activity", suggestion: "Take a historical walking tour of the old quarter.", location: "Heritage District" },
    { time: "1:30-5:30pm", activity: "Afternoon Activity", suggestion: "Visit an independent film screening at an art house cinema.", location: "Film Center" },
    { time: "1:30-5:30pm", activity: "Afternoon Activity", suggestion: "Discover a quirky vintage market.", location: "Retro Row" },
    { time: "1:30-5:30pm", activity: "Afternoon Activity", suggestion: "Relax in a lush botanical garden.", location: "Botanical Gardens" },
    { time: "1:30-5:30pm", activity: "Afternoon Activity", suggestion: "Participate in a pottery workshop.", location: "Artisan Loft" },
    { time: "1:30-5:30pm", activity: "Afternoon Activity", suggestion: "Enjoy a street performance festival.", location: "Central Square" },
    { time: "1:30-5:30pm", activity: "Afternoon Activity", suggestion: "Tour a quirky, modern art installation.", location: "Gallery District" },
    { time: "1:30-5:30pm", activity: "Afternoon Activity", suggestion: "Join a craft beer tasting at a local microbrewery.", location: "Brewery Row" }
  ],
  "Dinner": [
    { time: "6-7:30pm", activity: "Dinner", suggestion: "Dine on fusion cuisine at an avant-garde bistro.", location: "Fusion Plaza" },
    { time: "6-7:30pm", activity: "Dinner", suggestion: "Enjoy a rustic farm-to-table meal at The Harvest Inn.", location: "Countryside" },
    { time: "6-7:30pm", activity: "Dinner", suggestion: "Relish spicy street food at Urban Spice Market.", location: "Downtown" },
    { time: "6-7:30pm", activity: "Dinner", suggestion: "Savor Italian specialties at Mama Mia Trattoria.", location: "Little Italy" },
    { time: "6-7:30pm", activity: "Dinner", suggestion: "Experience modern sushi at Sashimi Studio.", location: "Sushi District" },
    { time: "6-7:30pm", activity: "Dinner", suggestion: "Feast on gourmet burgers at Burger Republic.", location: "Central Park" },
    { time: "6-7:30pm", activity: "Dinner", suggestion: "Enjoy spicy curries at Curry Kingdom.", location: "Market Street" },
    { time: "6-7:30pm", activity: "Dinner", suggestion: "Dine on creative tapas at Little Spain.", location: "Sunset Boulevard" },
    { time: "6-7:30pm", activity: "Dinner", suggestion: "Savor modern Mexican dishes at Cantina Viva.", location: "Downtown" },
    { time: "6-7:30pm", activity: "Dinner", suggestion: "Indulge in classic French cuisine at Le Petit Bistro.", location: "Parisian Quarter" }
  ],
  "Evening Activity": [
    { time: "8-10:30pm", activity: "Evening Activity", suggestion: "Catch an indie film screening at a retro cinema.", location: "Retro Theatre" },
    { time: "8-10:30pm", activity: "Evening Activity", suggestion: "Dance the night away at an underground jazz club.", location: "Jazz Alley" },
    { time: "8-10:30pm", activity: "Evening Activity", suggestion: "Enjoy a poetry slam at the local bookstore café.", location: "Literary Lane" },
    { time: "8-10:30pm", activity: "Evening Activity", suggestion: "Participate in a board game night at a quirky bar.", location: "Game Bar" },
    { time: "8-10:30pm", activity: "Evening Activity", suggestion: "Relax with a live acoustic set at a hidden speakeasy.", location: "Secret Lounge" },
    { time: "8-10:30pm", activity: "Evening Activity", suggestion: "Watch a local theater performance outdoors.", location: "Open-Air Stage" },
    { time: "8-10:30pm", activity: "Evening Activity", suggestion: "Join a midnight street food crawl.", location: "Night Market" },
    { time: "8-10:30pm", activity: "Evening Activity", suggestion: "Sip craft cocktails at a rooftop bar.", location: "Skyline Terrace" },
    { time: "8-10:30pm", activity: "Evening Activity", suggestion: "Attend a themed costume party at a vintage club.", location: "Vintage Vault" },
    { time: "8-10:30pm", activity: "Evening Activity", suggestion: "Experience an interactive improv comedy show.", location: "Improv Theater" }
  ]
};

type ScheduleItem = {
  time: string;
  activity: string;
  suggestion: string;
  location: string;
};

type ItineraryType = {
  id: number;
  user_id: string;
  schedule: ScheduleItem[];
};

const Home = () => {
  // Hardcode username for the demo (or parse from token)
  const userName = "Alejandro";

  // Use state for dayPart, date, time to avoid SSR mismatch
  const [dayPart, setDayPart] = useState<string | null>(null);
  const [estDate, setEstDate] = useState<string | null>(null);
  const [estTime, setEstTime] = useState<string | null>(null);

  // Hardcode location for demo
  const [location] = useState("Charlotte, NC");

  const [itinerary, setItinerary] = useState<ItineraryType | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // On mount, compute dayPart, date/time client-side, then fetch itinerary
  useEffect(() => {
    // 1) Compute day part
    const hour = new Date().getHours();
    let dp = "Morning";
    if (hour >= 12 && hour < 18) {
      dp = "Afternoon";
    } else if (hour >= 18 || hour < 5) {
      dp = "Evening";
    }
    setDayPart(dp);

    // 2) EST date/time
    const dateString = new Date().toLocaleDateString("en-US", { timeZone: "America/New_York" });
    const timeString = new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" });
    setEstDate(dateString);
    setEstTime(timeString);

    // 3) Fetch itinerary
    fetchItineraryFromServer();
  }, []);

  const fetchItineraryFromServer = async () => {
    try {
      const res = await apiFetch("http://127.0.0.1:8000/itinerary/1");
      if (!res.ok) throw new Error("Failed to fetch itinerary");
      const data: ItineraryType = await res.json();
      setItinerary(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Local function to pick a new random suggestion for thumbs down
  const pickNewLocalSuggestion = (activity: string, oldSuggestion: string): ScheduleItem | null => {
    const possible = (localSuggestions as any)[activity];
    if (!possible) return null;

    // Filter out the current suggestion so we don't pick the same one
    const filtered = possible.filter((item: ScheduleItem) => item.suggestion !== oldSuggestion);
    if (filtered.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  };

  const handleActivityFeedback = async (index: number, feedback: string) => {
    if (!itinerary) return;

    const currentItem = itinerary.schedule[index];
    if (!currentItem) return;

    try {
      // rating=2 for thumbs up, rating=1 for thumbs down
      const rating = feedback === "👍" ? 2 : 1;
      // Call server for analytics & official message
      const resp = await apiFetch("http://127.0.0.1:8000/itinerary/1/feedback", {
        method: "POST",
        body: JSON.stringify({
          activity: currentItem.activity,
          rating
        })
      });

      if (!resp.ok) {
        console.error("Feedback endpoint failed");
        return;
      }

      const serverData = await resp.json();
      // e.g., { message: "...", updated_activity?: {...} }
      setFeedbackMsg(serverData.message);

      // If thumbs down, do local replacement for instant UI update
      if (rating === 1) {
        const newLocalSuggestion = pickNewLocalSuggestion(currentItem.activity, currentItem.suggestion);
        if (newLocalSuggestion) {
          const updatedSchedule = itinerary.schedule.map((item, i) =>
            i === index ? newLocalSuggestion : item
          );
          setItinerary({ ...itinerary, schedule: updatedSchedule });
        } else {
          console.warn("No alternative local suggestions available for", currentItem.activity);
        }
      }
    } catch (err) {
      console.error("Feedback error:", err);
    }
  };

  // If dayPart or estDate/time not set yet, or no itinerary loaded, we can show a brief loading
  if (!dayPart || !estDate || !estTime || !itinerary) {
    return <p style={{ padding: "2rem" }}>Loading your itinerary...</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem", backgroundColor: "#fff" }}>
      <h1>Welcome to RoamRoute AI</h1>
      <p>Your personal travel assistant for optimized itineraries and local activities.</p>

      <h2>Good {dayPart}, {userName}.</h2>
      <p>
        Today is {estDate}, the time is {estTime} EST, 
        and your current location is {location}.
      </p>

      <hr style={{ margin: "1rem 0" }} />

      <h3>Your Itinerary:</h3>
      <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
        {itinerary.schedule.map((item, index) => (
          <li key={index} style={{ marginBottom: "1.5rem" }}>
            <div style={{ lineHeight: "1.6em" }}>
              {/* Merged Activity + Suggestion on one line, only bold the labels */}
              <h4 style={{ margin: 0, fontWeight: "normal" }}>
                <strong>{item.activity}</strong> <strong>Suggestion:</strong> {item.suggestion}
              </h4>

              {/* Time and Location with a 2-column grid for uniform alignment */}
              <div
                style={{
                  marginTop: "4px",
                  display: "grid",
                  gridTemplateColumns: "200px auto",
                  columnGap: "1rem",
                }}
              >
                <div>
                  <strong>Time:</strong> {item.time}
                </div>
                <div>
                  <strong>Location:</strong> {item.location}
                </div>
              </div>
            </div>

            {/* Thumbs-up/down buttons */}
            <div style={{ marginTop: "8px" }}>
              <button onClick={() => handleActivityFeedback(index, "👍")} style={{ marginRight: "10px" }}>
                👍
              </button>
              <button onClick={() => handleActivityFeedback(index, "👎")}>
                👎
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 
        Feedback message with line breaks (if \n is present).
        'whiteSpace: "pre-line"' ensures \n is rendered as an actual line break.
      */}
      {feedbackMsg && (
        <p style={{ marginTop: "1rem", whiteSpace: "pre-line", color: "#2e8b57", fontWeight: "bold" }}>
          {feedbackMsg}
        </p>
      )}
    </div>
  );
};

export default Home;