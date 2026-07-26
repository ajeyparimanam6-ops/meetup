export const API_BASE = "http://localhost:5000/api/auth";

// ====================== SIGNUP ======================
export const signupUser = async (username, email, password, role = "user") => {
  try {
    const res = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, role }),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user?.username || username);
      localStorage.setItem("email", data.user?.email || email);
      localStorage.setItem("userId", data.user?.id || data.id || "");
      localStorage.setItem("role", (data.user?.role || data.role || "user").toString().toLowerCase());
    }

    return data;
  } catch (err) {
    console.error("Signup error:", err);
    return { error: "Signup failed" };
  }
};

// ====================== LOGIN ======================
// FIX: Accept identifier (username or email) instead of just email
export const loginUser = async (identifier, password) => {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        // Send both username and email fields, let backend handle it
        username: identifier,
        email: identifier,
        password 
      }),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user?.username || "");
      localStorage.setItem("email", data.user?.email || "");
      localStorage.setItem("userId", data.user?.id || data.id || "");
      localStorage.setItem("role", (data.user?.role || data.role || "user").toString().toLowerCase());
    }

    return data;
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Login failed" };
  }
};

// ====================== LOGOUT + HELPERS ======================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
};

export const getUserRole = () => localStorage.getItem("role") || "guest";
export const isAdmin = () => getUserRole() === "admin";
export const getAuthToken = () => localStorage.getItem("token");
export const getUserId = () => localStorage.getItem("userId") || "";