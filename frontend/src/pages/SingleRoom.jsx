import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const SingleRoom = () => {
  const { id } = useParams();
  const { roomData } = useContext(AppContext);

  const room = roomData.find((r) => r._id === id);
  console.log(room);

  return (
    <div className="single-room-page">
      <h1>Room Details</h1>
      <p>Room ID: {id}</p>
      {room && <p>Room Name: {room.roomType}</p>}
    </div>
  );
};

export default SingleRoom;
