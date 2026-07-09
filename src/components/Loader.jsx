import React from "react";

const Loader = () => {
  return (
    <div style={styles.container}>
      <div style={styles.loader}></div>

      <h2 style={styles.text}>Loading Notes...</h2>

      <style>
        {`
          @keyframes spin {
            0%{
              transform:rotate(0deg);
            }
            100%{
              transform:rotate(360deg);
            }
          }

          @keyframes fade {
            0%{
              opacity:.5;
            }
            50%{
              opacity:1;
            }
            100%{
              opacity:.5;
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc",
  },

  loader: {
    width: "70px",
    height: "70px",
    border: "7px solid #e5e7eb",
    borderTop: "7px solid #2563eb",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  text: {
    marginTop: "20px",
    color: "#2563eb",
    fontWeight: "600",
    animation: "fade 1.5s infinite",
  },
};

export default Loader;