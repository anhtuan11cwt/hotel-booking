import { useContext } from "react";
import RoomCard from "../components/RoomCard";
import { AppContext } from "../context/AppContext";

const Rooms = () => {
  const { roomData } = useContext(AppContext);

  return (
    <div className="rooms-page py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 text-center">
          <h1 className="font-semibold text-[#152c5b] text-heading text-3xl">
            Tất cả các phòng
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[#4b5563] text-paragraph text-sm">
            Khám phá tất cả các phòng có sẵn tại khách sạn của chúng tôi
          </p>
        </div>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {roomData.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
