import {
  Calendar,
  CheckCircle,
  MapPin,
  Phone,
  Star,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { getAmenityIcon } from "../utils/amenityIcons";
import { formatCurrencyVND } from "../utils/currency";

const SingleRoom = () => {
  const { id } = useParams();
  const { roomData } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [persons, setPersons] = useState(1);

  const room = roomData.find((r) => r._id === id);

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Vui lòng chọn ngày nhận phòng và ngày trả phòng");
      return;
    }
    toast.success("Yêu cầu đặt phòng đã được gửi thành công!");
  };

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Không tìm thấy phòng</p>
      </div>
    );
  }

  return (
    <div className="single-room-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {room.roomType}
          </h1>

          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <MapPin className="w-5 h-5 shrink-0" />
            <span>{room.hotel.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="font-medium text-gray-700">
              {room.hotel.rating}
            </span>
          </div>

          <div className="mt-4">
            {room.isAvailable ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Còn phòng
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                <XCircle className="w-4 h-4" />
                Hết phòng
              </span>
            )}
          </div>
        </div>

        <div className="lg:text-right flex flex-col gap-3">
          <div className="text-3xl font-bold text-gray-800">
            {formatCurrencyVND(room.pricePerNight)}
            <span className="text-base font-normal text-gray-500"> / đêm</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-600 lg:justify-end">
              <User className="w-4 h-4" />
              <span>{room.hotel.ownerName}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 lg:justify-end">
              <Phone className="w-4 h-4" />
              <span>{room.hotel.contactNumber}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              alt={`${room.roomType} - Hình ảnh ${selectedImage + 1}`}
              className="w-full h-96 object-cover"
              src={room.images[selectedImage]}
            />
          </div>

          <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
            {room.images.map((image, index) => (
              <button
                className={`shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all duration-200 ${
                  selectedImage === index
                    ? "ring-4 ring-blue-500 opacity-100"
                    : "opacity-70 hover:opacity-100"
                }`}
                key={image}
                onClick={() => setSelectedImage(index)}
                type="button"
              >
                <img
                  alt={`Ảnh thu nhỏ ${index + 1}`}
                  className="w-full h-full object-cover"
                  src={image}
                />
              </button>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Về phòng này
            </h2>
            <p className="text-gray-600 leading-relaxed">{room.description}</p>
          </div>

          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Tiện nghi phòng
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {room.amenities.map((amenity) => {
                const IconComponent = getAmenityIcon(amenity);
                return (
                  <div
                    className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg"
                    key={amenity}
                  >
                    <IconComponent className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="text-gray-700 text-sm">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Tiện nghi khách sạn
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {room.hotel.amenities.map((amenity) => {
                const IconComponent = getAmenityIcon(amenity);
                return (
                  <div
                    className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg"
                    key={amenity}
                  >
                    <IconComponent className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="text-gray-700 text-sm">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Đặt phòng ngay
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="check_in_date"
                >
                  Ngày nhận phòng
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    id="check_in_date"
                    onChange={(e) => setCheckInDate(e.target.value)}
                    type="date"
                    value={checkInDate}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="check_out_date"
                >
                  Ngày trả phòng
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    id="check_out_date"
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    type="date"
                    value={checkOutDate}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="guest_count"
                >
                  Số lượng khách
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    id="guest_count"
                    max={room.maxGuests || 4}
                    min="1"
                    onChange={(e) =>
                      setPersons(Number.parseInt(e.target.value, 10) || 1)
                    }
                    type="number"
                    value={persons}
                  />
                </div>
              </div>

              <div className="border-t pt-4 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Giá mỗi đêm</span>
                  <span className="font-semibold text-gray-800">
                    {formatCurrencyVND(room.pricePerNight)}
                  </span>
                </div>
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  room.isAvailable
                    ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!room.isAvailable}
                onClick={handleBooking}
                type="button"
              >
                {room.isAvailable
                  ? "Kiểm tra tình trạng phòng"
                  : "Không còn phòng"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRoom;
