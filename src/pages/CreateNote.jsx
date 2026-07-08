import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import NoteForm from "../components/NoteForm";
import { createNote } from "../services/noteService";

export default function CreateNote() {
  const navigate = useNavigate();

  const handleCreate = async (noteData) => {
    try {
      await createNote(noteData);

      toast.success("Note created successfully");

      navigate("/");
    } catch (error) {
      toast.error(error.message || "Unable to create note");
    }
  };

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "30px",
        }}
      >
        ➕ Create Note
      </h1>

      <NoteForm onSubmit={handleCreate} />
    </div>
  );
}