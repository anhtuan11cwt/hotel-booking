import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import RoomCard from "./RoomCard";

const PopularRooms = () => {
  const { fetchAllRooms, roomData } = useContext(AppContext);

  useEffect(() => {
    fetchAllRooms();
  }, [fetchAllRooms]);

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 text-center">
          <h1 className="font-semibold text-[#152c5b] text-heading text-3xl">
            Phòng phổ biến
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[#4b5563] text-paragraph text-sm">
            Khám phá những phòng được yêu thích nhất với tiện nghi cao cấp và
            giá cả hợp lý
          </p>
        </div>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {roomData.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRooms;
