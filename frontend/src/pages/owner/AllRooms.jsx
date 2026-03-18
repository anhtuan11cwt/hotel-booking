/* eslint-disable no-unused-vars */
import { MapPin, Star, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { formatCurrencyVND } from "../../utils/currency";

const AllRooms = () => {
  const { deleteRoom, fetchOwnerRooms, roomData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOwnerRooms();
  }, [fetchOwnerRooms]);

  const handleDelete = async (roomId) => {
    const success = await deleteRoom(roomId);
    if (success) {
      toast.success("Xóa phòng thành công!");
    } else {
      toast.error("Xóa phòng thất bại!");
    }
  };

  return (
    <div className="bg-gray-50 p-4 md:p-8 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-bold text-gray-900 text-2xl md:text-3xl">
              Danh sách phòng của bạn
            </h1>
            <p className="mt-1 text-gray-600">
              Quản lý các phòng của bạn tại đây
            </p>
          </div>
          <motion.button
            className="bg-linear-to-r from-orange-500 to-orange-600 shadow-lg hover:shadow-xl px-6 py-3 rounded-xl font-medium text-white"
            onClick={() => navigate("/owner/add-room")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Thêm phòng mới
          </motion.button>
        </div>

        <div className="bg-white shadow-lg rounded-2xl overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                <th className="px-4 py-4 font-semibold text-sm text-left uppercase tracking-wider">
                  Khách sạn
                </th>
                <th className="px-4 py-4 font-semibold text-sm text-left uppercase tracking-wider">
                  Loại phòng
                </th>
                <th className="px-4 py-4 font-semibold text-sm text-left uppercase tracking-wider">
                  Vị trí
                </th>
                <th className="px-4 py-4 font-semibold text-sm text-left uppercase tracking-wider">
                  Xếp hạng
                </th>
                <th className="px-4 py-4 font-semibold text-sm text-left uppercase tracking-wider">
                  Giá mỗi đêm
                </th>
                <th className="px-4 py-4 font-semibold text-sm text-left uppercase tracking-wider">
                  Tiện nghi
                </th>
                <th className="px-4 py-4 font-semibold text-sm text-left uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {roomData.map((room, index) => (
                <tr
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors duration-200`}
                  key={room._id}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        alt={room.roomType}
                        className="shadow-md rounded-lg w-16 h-12 object-cover"
                        src={
                          room.images[0] || "https://via.placeholder.com/100"
                        }
                      />
                      <span className="font-medium text-gray-900 hover:text-orange-600 transition-colors duration-200 cursor-pointer">
                        {room.hotel?.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-medium text-gray-900">
                      {room.roomType}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="text-sm">{room.hotel?.address}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                      <span className="font-medium text-gray-900">
                        {room.hotel?.rating}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-gray-900">
                      {formatCurrencyVND(room.pricePerNight)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.map((amenity) => (
                        <span
                          className="bg-blue-50 px-2 py-1 rounded-full text-blue-700 text-xs"
                          key={amenity}
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      aria-label={`Xóa ${room.roomType}`}
                      className="bg-red-50 hover:bg-red-100 p-2 rounded-full text-red-600 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                      onClick={() => handleDelete(room._id)}
                      type="button"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
