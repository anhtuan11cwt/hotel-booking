/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVND } from "../utils/currency";

const HotelCard = ({ hotel, animated = false, delay = 0 }) => {
  const navigate = useNavigate();

  const cardContent = (
    <>
      <img
        alt={hotel.name}
        className="rounded-md w-full max-h-40 object-cover"
        src={hotel.image}
      />
      <p className="mx-3 mt-4 font-semibold text-gray-900 text-base">
        {hotel.name}
      </p>
      <p className="mx-3 mt-2 mb-3 text-zinc-400 text-sm line-clamp-2">
        {hotel.address}
      </p>
      <div className="flex justify-between items-center mx-3 mb-4">
        <span className="font-semibold text-indigo-600">
          {formatCurrencyVND(hotel.price)}
        </span>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-medium text-white text-sm transition cursor-pointer"
          onClick={() => navigate(`/hotel/${hotel.id}/rooms`)}
          type="button"
        >
          Xem chi tiết
        </button>
      </div>
    </>
  );

  if (animated) {
    return (
      <motion.div
        animate={{ y: [0, -15, 0] }}
        className="bg-white shadow shadow-black/10 border border-gray-200 rounded-lg w-80 transition hover:-translate-y-1 duration-300"
        key={hotel.id}
        transition={{
          delay: delay * 0.2,
          duration: 3,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div className="bg-white shadow shadow-black/10 border border-gray-200 rounded-lg w-80 transition hover:-translate-y-1 duration-300">
      {cardContent}
    </div>
  );
};

export default HotelCard;
