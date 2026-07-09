import { useState, useEffect } from "react";
import { FaStickyNote, FaAlignLeft, FaSave } from "react-icons/fa";

function NoteForm({
  initialData,
  onSubmit,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Sirf Edit mode me form ko initialData se fill karo
  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
      });
    }
  }, [isEditing, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    onSubmit(formData);

    // Create mode me form clear karo
    if (!isEditing) {
      setFormData({
        title: "",
        description: "",
      });
    }
  };

  return (
    <div className="note-form-container">
      <form className="note-form" onSubmit={handleSubmit}>
        <h2>
          {isEditing ? "Edit Note" : "Create New Note"}
        </h2>

        {/* Title */}
        <div className="input-group">
          <FaStickyNote className="input-icon" />

          <input
            type="text"
            name="title"
            placeholder="Enter note title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="input-group textarea-group">
          <FaAlignLeft className="input-icon" />

          <textarea
            rows="7"
            name="description"
            placeholder="Write your note..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          <FaSave />
          {isEditing ? " Update Note" : " Save Note"}
        </button>
      </form>
    </div>
  );
}

export default NoteForm;