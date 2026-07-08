import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getNotes,
  deleteNote,
} from "../services/noteService";

const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==================================
  // Fetch All Notes
  // ==================================

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const res = await getNotes();

      // ApiResponse -> data contains notes array
      setNotes(res.data || []);

      setError("");
    } catch (err) {
      const message =
        err.message || "Failed to fetch notes";

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==================================
  // Delete Note
  // ==================================

  const removeNote = async (id) => {
    try {
      await deleteNote(id);

      setNotes((prev) =>
        prev.filter((note) => note._id !== id)
      );

      toast.success("Note deleted successfully");
    } catch (err) {
      toast.error(
        err.message || "Failed to delete note"
      );
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    error,

    fetchNotes,
    removeNote,
  };
};

export default useNotes;