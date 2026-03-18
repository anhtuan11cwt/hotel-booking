import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AppContext } from "./context/AppContext";
import About from "./pages/About";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import AddRoom from "./pages/owner/AddRoom";
import AllHotels from "./pages/owner/AllHotels";
import AllRooms from "./pages/owner/AllRooms";
import Bookings from "./pages/owner/Bookings";
import OwnerLayout from "./pages/owner/OwnerLayout";
import RegisterHotel from "./pages/owner/RegisterHotel";
import Rooms from "./pages/Rooms";
import Signup from "./pages/Signup";
import SingleRoom from "./pages/SingleRoom";

const OwnerRoute = ({ children }) => {
  const { owner } = useContext(AppContext);
  const isDev = import.meta.env.DEV;

  if (!owner && !isDev) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

function App() {
  const location = useLocation();
  const ownerPath = location.pathname.includes("/owner");

  return (
    <div className="min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
          style: {
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            color: "#333",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
        }}
      />
      {!ownerPath && <Navbar />}

      <main className={!ownerPath ? "pt-16 md:pt-20" : ""}>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<Rooms />} path="/rooms" />
          <Route element={<Hotels />} path="/hotels" />
          <Route element={<SingleRoom />} path="/room/:id" />
          <Route element={<MyBookings />} path="/my-bookings" />

          <Route
            element={
              <OwnerRoute>
                <OwnerLayout />
              </OwnerRoute>
            }
            path="/owner"
          >
            <Route element={<Navigate replace to="hotels" />} index />
            <Route element={<RegisterHotel />} path="register-hotel" />
            <Route element={<AllHotels />} path="hotels" />
            <Route element={<AddRoom />} path="add-room" />
            <Route element={<AllRooms />} path="rooms" />
            <Route element={<Bookings />} path="bookings" />
          </Route>
        </Routes>
      </main>

      {!ownerPath && <Footer />}
    </div>
  );
}

export default App;
