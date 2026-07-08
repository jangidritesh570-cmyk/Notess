import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="main-container">
        <Routes>
          {/* ================= Public Routes ================= */}

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />

          {/* ================= Protected Routes ================= */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateNote />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditNote />
              </ProtectedRoute>
            }
          />

          {/* ================= 404 ================= */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;