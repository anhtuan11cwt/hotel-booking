import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import Rooms from "./pages/Rooms";
import Signup from "./pages/Signup";
import SingleRoom from "./pages/SingleRoom";

function App() {
  const location = useLocation();
  const ownerPath = location.pathname.includes("owner");

  return (
    <div className="min-h-screen">
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
        </Routes>
      </main>

      {!ownerPath && <Footer />}
    </div>
  );
}

export default App;
