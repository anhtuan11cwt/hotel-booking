import { useParams } from "react-router-dom";

const SingleRoom = () => {
  const { id } = useParams();

  return (
    <div className="single-room-page">
      <h1>Room Details</h1>
      <p>Room ID: {id}</p>
    </div>
  );
};

export default SingleRoom;
