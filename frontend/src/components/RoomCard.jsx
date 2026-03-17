/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleSeeDetails = () => {
    navigate(`/room/${room._id}`);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      maximumFractionDigits: 0,
      style: "currency",
    }).format(price);
  };

  return (
    <motion.div
      className="bg-white shadow-xl rounded-lg overflow-hidden cursor-pointer"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      whileHover={{ scale: 1.1 }}
    >
      <img
        alt={room.roomType}
        className="w-full h-52 object-cover"
        src={room.images[0]}
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg">{room.roomType}</h3>
        <div className="flex items-center mt-2 text-zinc-500 text-sm">
          <span className="font-semibold text-indigo-600 text-base">
            {formatPrice(room.pricePerNight)}
          </span>
          <span className="ml-1">/ đêm</span>
        </div>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 mt-4 px-4 py-2 rounded-md w-full font-medium text-white text-sm transition cursor-pointer"
          onClick={handleSeeDetails}
          type="button"
        >
          Xem chi tiết
        </button>
      </div>
    </motion.div>
  );
};

export default RoomCard;
