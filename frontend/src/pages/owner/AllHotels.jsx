/* eslint-disable no-unused-vars */
import { MapPin, Phone, Star, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const AllHotels = () => {
  const { hotelData, fetchOwnerHotels, axios } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHotels = async () => {
      setIsLoading(true);
      await fetchOwnerHotels();
      setIsLoading(false);
    };
    loadHotels();
  }, [fetchOwnerHotels]);

  const handleDelete = async (hotelId) => {
    try {
      const { data } = await axios.delete(`/api/hotel/delete/${hotelId}`);
      if (data.success) {
        toast.success(data.message || "Xóa khách sạn thành công!");
        await fetchOwnerHotels();
      } else {
        toast.error(data.message || "Xóa khách sạn thất bại");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Đã xảy ra lỗi khi xóa khách sạn",
      );
    }
  };

  return (
    <div className="bg-gray-50 p-4 md:p-8 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-bold text-gray-900 text-2xl md:text-3xl">
              Danh sách khách sạn của bạn
            </h1>
            <p className="mt-1 text-gray-600">
              Khám phá và quản lý các điểm lưu trú của bạn
            </p>
          </div>
          <motion.button
            className="bg-linear-to-r from-orange-500 to-orange-600 shadow-lg hover:shadow-xl px-6 py-3 rounded-xl font-medium text-white"
            onClick={() => navigate("/owner/register-hotel")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Đăng ký khách sạn
          </motion.button>
        </div>

        <div className="bg-white shadow-lg rounded-2xl overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <span className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : hotelData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <p className="text-lg">Chưa có khách sạn nào</p>
              <p className="text-sm">Đăng ký khách sạn đầu tiên của bạn</p>
            </div>
          ) : (
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="px-4 py-4 font-semibold text-sm text-left uppercase tracking-wider">
                    Khách sạn
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm text-left uppercase tracking-wider">
                    Địa điểm
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm text-left uppercase tracking-wider">
                    Chủ sở hữu
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm text-left uppercase tracking-wider">
                    Liên hệ
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm text-left uppercase tracking-wider">
                    Đánh giá
                  </th>
                  <th className="px-4 py-4 font-semibold text-sm text-left uppercase tracking-wider">
                    Giá
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
                {hotelData.map((hotel, index) => (
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors duration-200`}
                    key={hotel.id}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          alt={hotel.name}
                          className="shadow-md rounded-lg w-16 h-12 object-cover"
                          src={hotel.image}
                        />
                        <span className="font-medium text-gray-900 hover:text-orange-600 transition-colors duration-200 cursor-pointer">
                          {hotel.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="text-sm">{hotel.address}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium text-gray-900">
                        {hotel.ownerName}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 shrink-0" />
                        <span className="text-sm">{hotel.contactNumber}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                        <span className="font-medium text-gray-900">
                          {hotel.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-gray-900">
                        {hotel.price}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {hotel.amenities?.slice(0, 3).map((amenity) => (
                          <span
                            className="bg-blue-50 px-2 py-1 rounded-full text-blue-700 text-xs"
                            key={`${hotel.id}-${amenity}`}
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        aria-label={`Xóa ${hotel.name}`}
                        className="bg-red-50 hover:bg-red-100 p-2 rounded-full text-red-600 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                        onClick={() => handleDelete(hotel.id)}
                        type="button"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllHotels;
