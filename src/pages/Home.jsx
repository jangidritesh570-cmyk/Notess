import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";
import useNotes from "../hooks/useNotes";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    notes,
    loading,
    error,
    removeNote,
  } = useNotes();

  // ==========================
  // Search Filter
  // ==========================

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const title = note.title?.toLowerCase() || "";
      const description = note.description?.toLowerCase() || "";

      return (
        title.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase())
      );
    });
  }, [notes, searchTerm]);

  return (
    <>
      <style>{`
      
      .home{
        padding:40px 0;
      }

      .home-title{
        text-align:center;
        color:white;
        font-size:2.3rem;
        margin-bottom:10px;
      }

      .home-subtitle{
        text-align:center;
        color:#94A3B8;
        margin-bottom:35px;
      }

      .notes-header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin:35px 0 25px;
      }

      .notes-header h2{
        color:white;
      }

      .notes-grid{

        display:grid;

        grid-template-columns:
        repeat(auto-fit,minmax(320px,1fr));

        gap:25px;

      }

      .loading{

        color:white;

        text-align:center;

        font-size:22px;

        margin-top:80px;

      }

      .error{

        color:#EF4444;

        text-align:center;

        margin-top:80px;

        font-size:20px;

      }

      .empty-state{

        background:#1E293B;

        border:1px solid #334155;

        border-radius:18px;

        padding:60px 20px;

        text-align:center;

      }

      .empty-state h2{

        color:white;

        margin-bottom:10px;

      }

      .empty-state p{

        color:#94A3B8;

      }

      @media(max-width:768px){

        .home-title{

          font-size:1.8rem;

        }

        .notes-header{

          flex-direction:column;

          align-items:flex-start;

          gap:10px;

        }

      }

      `}</style>

      <motion.div
        className="container home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="home-title">
          📝 Notes Dashboard
        </h1>

        <p className="home-subtitle">
          Save your ideas and organize everything in one place.
        </p>

        {/* Search */}

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Loading */}

        {loading && (
          <div className="loading">
            Loading Notes...
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="error">
            {error}
          </div>
        )}

        {/* Success */}

        {!loading && !error && (
          <>
            <div className="notes-header">
              <h2>
                My Notes ({filteredNotes.length})
              </h2>
            </div>

            {filteredNotes.length === 0 ? (
              <div className="empty-state">
                <h2>No Notes Found</h2>

                <p>
                  Create your first note to get started.
                </p>
              </div>
            ) : (
              <div className="notes-grid">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onDelete={removeNote}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </motion.div>
    </>
  );
}

export default Home;