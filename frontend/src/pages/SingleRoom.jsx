import { CheckCircle, MapPin, Phone, Star, User, XCircle } from "lucide-react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { getAmenityIcon } from "../utils/amenityIcons";

const SingleRoom = () => {
  const { id } = useParams();
  const { roomData } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(0);

  const room = roomData.find((r) => r._id === id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      maximumFractionDigits: 0,
      style: "currency",
    }).format(price);
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
            {formatPrice(room.pricePerNight)}
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

      <div className="mt-8">
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
      </div>

      <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Về phòng này</h2>
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
  );
};

export default SingleRoom;
