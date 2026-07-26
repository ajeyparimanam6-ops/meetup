// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { API_BASE } from "./api/meetupApi";

// Pages
import Home from "./pages/Home";
import Meetups from "./pages/Meetups";
import MeetupDetails from "./pages/MeetupDetails"; // ✅ Added
import CreateMeetup from "./pages/CreateMeetup";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [meetups, setMeetups] = useState([]);

  // ✅ Fetch meetups from backend on mount
  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const res = await fetch(`${API_BASE}/meetups`);
        const data = await res.json();
        setMeetups(data);
      } catch (err) {
        console.error("Failed to fetch meetups:", err);
      }
    };
    fetchMeetups();
  }, []);

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow w-full">
          <Routes>
            {/* ✅ Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/meetups" element={<Meetups meetups={meetups} />} />
            <Route path="/meetups/:id" element={<MeetupDetails />} /> {/* ✅ Added */}

            {/* ✅ Separate login routes for User and Admin */}
            <Route path="/login/user" element={<UserLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />

            {/* ✅ Protected route for creating meetups */}
            <Route
              path="/create-meetup"
              element={
                <ProtectedRoute>
                  <CreateMeetup setMeetups={setMeetups} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;