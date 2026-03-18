import { ArrowLeft, MapPin, Star, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import { AppContext } from "../context/AppContext";
import { getAmenityIcon } from "../utils/amenityIcons";
import { formatCurrencyVND } from "../utils/currency";

const HotelRooms = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios } = useContext(AppContext);
  const [hotel, setHotel] = useState(null);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [hotelRes, roomsRes] = await Promise.all([
          axios.get("/api/hotel/getall"),
          axios.get("/api/room/all"),
        ]);

        const foundHotel = hotelRes.data.hotels?.find((h) => h._id === id);
        if (foundHotel) {
          setHotel({
            address: foundHotel.hotelAddress,
            amenities: foundHotel.amenities || [],
            id: foundHotel._id,
            image: foundHotel.image || "",
            name: foundHotel.hotelName,
            ownerName: foundHotel.owner?.name || "Chưa có",
            price: foundHotel.price,
            rating: foundHotel.rating,
          });
        }

        const rooms =
          roomsRes.data.rooms
            ?.filter((room) => room.hotel?._id === id)
            .map((room) => ({
              _id: room._id,
              amenities: room.amenities || [],
              description: room.description,
              hotel: {
                _id: room.hotel?._id,
                address: room.hotel?.hotelAddress,
                amenities: room.hotel?.amenities || [],
                contactNumber: room.hotel?.owner?.phone || "Chưa có",
                name: room.hotel?.hotelName,
                ownerName: room.hotel?.owner?.name || "Chưa có",
                rating: room.hotel?.rating,
              },
              images: room.images || [],
              isAvailable: room.isAvailable,
              maxGuests: room.maxGuests || 4,
              pricePerNight: room.pricePerNight,
              roomType: room.roomType,
            })) || [];

        setHotelRooms(rooms);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, axios]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Không tìm thấy khách sạn</p>
          <button
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
            onClick={handleBack}
            type="button"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition cursor-pointer"
            onClick={handleBack}
            type="button"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </button>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <img
              alt={hotel.name}
              className="w-full md:w-80 h-48 md:h-56 object-cover rounded-xl shadow-lg"
              src={hotel.image}
            />

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {hotel.name}
              </h1>

              <div className="flex items-center gap-2 text-white/90 mb-4">
                <MapPin className="w-5 h-5 shrink-0" />
                <span>{hotel.address}</span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{hotel.rating}</span>
                <span className="text-white/70">|</span>
                <span className="text-white/90">
                  Chủ khách sạn: {hotel.ownerName}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {hotel.amenities.slice(0, 4).map((amenity) => {
                  const IconComponent = getAmenityIcon(amenity);
                  return (
                    <div
                      className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm"
                      key={amenity}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="md:text-right">
              <p className="text-white/70 text-sm mb-1">Giá từ</p>
              <p className="text-3xl font-bold">
                {formatCurrencyVND(hotel.price)}
              </p>
              <p className="text-white/70 text-sm">/ đêm</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Các phòng của {hotel.name}
            </h2>
            <p className="text-gray-500 mt-1">
              {hotelRooms.length} phòng có sẵn
            </p>
          </div>
        </div>

        {hotelRooms.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Chưa có phòng nào
            </h3>
            <p className="text-gray-500">
              Khách sạn này hiện chưa có phòng nào được đăng tải.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hotelRooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}

        {hotelRooms.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Tiện nghi khách sạn
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hotel.amenities.map((amenity) => {
                const IconComponent = getAmenityIcon(amenity);
                return (
                  <div
                    className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl"
                    key={amenity}
                  >
                    <IconComponent className="w-6 h-6 text-indigo-600 shrink-0" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelRooms;
