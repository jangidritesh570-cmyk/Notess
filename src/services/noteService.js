import axios from "axios";

// ==========================================
// Axios Instance
// ==========================================

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// Attach JWT Token Automatically
// ==========================================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================
// Get All Notes
// GET /api/notes
// ==========================================

export const getNotes = async () => {
  try {
    const { data } = await API.get("/notes");
    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch notes",
      }
    );
  }
};

// ==========================================
// Get Single Note
// GET /api/notes/:id
// ==========================================

export const getNote = async (id) => {
  try {
    const { data } = await API.get(`/notes/${id}`);
    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch note",
      }
    );
  }
};

// ==========================================
// Create Note
// POST /api/notes
// ==========================================

export const createNote = async (noteData) => {
  try {
    const { data } = await API.post("/notes", noteData);
    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to create note",
      }
    );
  }
};

// ==========================================
// Update Note
// PUT /api/notes/:id
// ==========================================

export const updateNote = async (id, noteData) => {
  try {
    const { data } = await API.put(`/notes/${id}`, noteData);
    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to update note",
      }
    );
  }
};

// ==========================================
// Delete Note
// DELETE /api/notes/:id
// ==========================================

export const deleteNote = async (id) => {
  try {
    const { data } = await API.delete(`/notes/${id}`);
    return data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to delete note",
      }
    );
  }
};

export default API;