import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyBookings = () => {
  const { user } = useContext(AppContext);

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>
      {user ? (
        <p>Your bookings will appear here</p>
      ) : (
        <p>Please login to view your bookings</p>
      )}
    </div>
  );
};

export default MyBookings;
