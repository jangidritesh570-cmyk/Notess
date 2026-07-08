import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaRegCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
// import "./NoteCard.css";

function NoteCard({ note, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <motion.div
      className="note-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <div className="note-card-header">
        <h3>{note.title}</h3>
      </div>

      <div className="note-card-body">
        <p>{note.description}</p>
      </div>

      <div className="note-card-footer">
        <div className="note-date">
          <FaRegCalendarAlt />
          <span>{formatDate(note.createdAt)}</span>
        </div>

        <div className="note-actions">
          <Link
            to={`/edit/${note._id}`}
            className="edit-btn"
          >
            <FaEdit />
          </Link>

          <button
            className="delete-btn"
            onClick={() => onDelete(note._id)}
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default NoteCard;