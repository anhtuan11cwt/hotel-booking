/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { getAmenityIcon } from "../utils/amenityIcons";

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
        <div className="flex flex-wrap gap-2 mt-3">
          {room.amenities.slice(0, 3).map((amenity) => {
            const IconComponent = getAmenityIcon(amenity);
            return (
              <div
                className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg"
                key={`${room._id}-${amenity}`}
              >
                <IconComponent className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-600">{amenity}</span>
              </div>
            );
          })}
          {room.amenities.length > 3 && (
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded-lg">
              <span className="text-xs text-gray-600">
                +{room.amenities.length - 3}
              </span>
            </div>
          )}
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
