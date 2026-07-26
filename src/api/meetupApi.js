
// src/api/meetupApi.js

export const API_BASE = "http://localhost:5000/api";

/**
 * Fetch all meetups (available for all users)
 */
export const getMeetups = async () => {
  const res = await fetch(`${API_BASE}/meetups`);
  return res.json();
};

/**
 * Create a new meetup (Admin only)
 * Requires JWT token in Authorization header
 */
export const createMeetup = async (meetupData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/meetups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ Include token for middleware
    },
    body: JSON.stringify(meetupData),
  });

  return res.json();
};

/**
 * Delete a meetup (Admin only)
 * Requires JWT token in Authorization header
 */
export const deleteMeetup = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/meetups/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Include token for middleware
    },
  });

  return res.json();
};

/**
 * Join a meetup (Any authenticated user)
 * Requires JWT token in Authorization header
 */
export const joinMeetup = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/meetups/${id}/join`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Include token for authMiddleware
    },
  });

  return res.json();
};
