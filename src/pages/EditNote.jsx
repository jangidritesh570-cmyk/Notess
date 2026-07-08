import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import NoteForm from "../components/NoteForm";
import {
  getNote,
  updateNote,
} from "../services/noteService";

export default function EditNote() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const res = await getNote(id);

      setNote(res.data);

      setLoading(false);
    } catch (error) {
      toast.error(error.message || "Failed to fetch note");

      navigate("/");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateNote(id, data);

      toast.success("Note updated successfully");

      navigate("/");
    } catch (error) {
      toast.error(error.message || "Unable to update note");
    }
  };

  if (loading)
    return (
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        Loading...
      </h2>
    );

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "30px",
        }}
      >
        ✏ Edit Note
      </h1>

      <NoteForm
        initialData={note}
        isEditing
        onSubmit={handleUpdate}
      />
    </div>
  );
}