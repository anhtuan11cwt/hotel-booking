import {
  Calendar,
  CheckCircle,
  CreditCard,
  MapPin,
  Phone,
  Star,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { getAmenityIcon } from "../utils/amenityIcons";
import { formatCurrencyVND } from "../utils/currency";

const SingleRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios, fetchRoomById, user } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    paymentMethod: "pay-at-hotel",
    persons: 1,
  });
  const [isAvailable, setIsAvailable] = useState(false);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const getRoomData = async () => {
      const fetchedRoom = await fetchRoomById(id);
      if (fetchedRoom) {
        setRoom(fetchedRoom);
      }
      setLoading(false);
    };
    getRoomData();
  }, [id, fetchRoomById]);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const onChangeHandler = (field, value) => {
    setBookingData((prev) => {
      const newData = { ...prev, [field]: value };

      if (field === "checkIn" && prev.checkOut && value > prev.checkOut) {
        newData.checkOut = "";
      }
      if (field === "checkOut" && prev.checkIn && value < prev.checkIn) {
        newData.checkOut = "";
      }

      if (field === "checkIn" || field === "checkOut") {
        setIsAvailable(false);
      }

      return newData;
    });
  };

  const checkAvailabilityHandler = async () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      toast.error("Vui lòng chọn ngày nhận phòng và ngày trả phòng");
      return;
    }

    if (new Date(bookingData.checkIn) >= new Date(bookingData.checkOut)) {
      toast.error("Ngày nhận phòng phải trước ngày trả phòng");
      return;
    }

    setCheckingAvailability(true);
    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        roomId: id,
      });

      if (data.success) {
        setIsAvailable(data.isAvailable);
        if (data.isAvailable) {
          toast.success("Phòng còn trống! Bạn có thể đặt ngay.");
        } else {
          toast.error("Phòng đã được đặt trong khoảng thời gian này.");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi kiểm tra phòng trống");
    } finally {
      setCheckingAvailability(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!bookingData.checkIn || !bookingData.checkOut) {
      toast.error("Vui lòng chọn ngày nhận phòng và ngày trả phòng");
      return;
    }

    if (new Date(bookingData.checkIn) >= new Date(bookingData.checkOut)) {
      toast.error("Ngày nhận phòng phải trước ngày trả phòng");
      return;
    }

    if (!isAvailable) {
      toast.error("Vui lòng kiểm tra tình trạng phòng trước khi đặt");
      return;
    }

    if (!user) {
      toast.error("Vui lòng đăng nhập để đặt phòng");
      navigate("/login");
      return;
    }

    setBookingLoading(true);
    try {
      const { data } = await axios.post("/api/bookings/book", {
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        hotelId: room.hotel._id,
        paymentMethod: bookingData.paymentMethod,
        persons: bookingData.persons,
        roomId: id,
      });

      if (data.success) {
        if (bookingData.paymentMethod === "stripe") {
          try {
            const paymentRes = await axios.post(
              "/api/bookings/stripe-payment",
              {
                bookingId: data.booking._id,
              },
            );
            if (paymentRes.data.success) {
              window.location.href = paymentRes.data.url;
            }
          } catch {
            toast.error("Lỗi thanh toán, vui lòng thử lại");
            navigate("/my-bookings");
          }
        } else {
          toast.success("Đặt phòng thành công!");
          window.scrollTo(0, 0);
          navigate("/my-bookings");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi đặt phòng");
      if (error.response?.data?.message === "Unauthorized") {
        navigate("/login");
      }
    } finally {
      setBookingLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    if (!room || !bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return room.pricePerNight * nights * bookingData.persons;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

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
            <span>{room.hotel.name}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>{room.hotel.address}</span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="font-medium text-gray-700">
              {room.hotel.rating}
            </span>
          </div>

          <div className="mt-4">
            {isAvailable ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Còn phòng
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                <XCircle className="w-4 h-4" />
                Chưa kiểm tra
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
                    min={getTodayDate()}
                    onChange={(e) => onChangeHandler("checkIn", e.target.value)}
                    type="date"
                    value={bookingData.checkIn}
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
                    min={bookingData.checkIn || getTodayDate()}
                    onChange={(e) =>
                      onChangeHandler("checkOut", e.target.value)
                    }
                    type="date"
                    value={bookingData.checkOut}
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
                    max={room.maxGuests || 10}
                    min="1"
                    onChange={(e) =>
                      onChangeHandler(
                        "persons",
                        Number.parseInt(e.target.value, 10) || 1,
                      )
                    }
                    type="number"
                    value={bookingData.persons}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="payment_method"
                >
                  Phương thức thanh toán
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                    id="payment_method"
                    onChange={(e) =>
                      onChangeHandler("paymentMethod", e.target.value)
                    }
                    value={bookingData.paymentMethod}
                  >
                    <option value="pay-at-hotel">
                      Thanh toán tại khách sạn
                    </option>
                    <option value="stripe">Thanh toán qua Stripe</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Giá mỗi đêm</span>
                  <span className="font-semibold text-gray-800">
                    {formatCurrencyVND(room.pricePerNight)}
                  </span>
                </div>
                {bookingData.checkIn && bookingData.checkOut && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Số đêm</span>
                    <span className="font-semibold text-gray-800">
                      {Math.ceil(
                        (new Date(bookingData.checkOut) -
                          new Date(bookingData.checkIn)) /
                          (1000 * 60 * 60 * 24),
                      )}
                    </span>
                  </div>
                )}
                {bookingData.checkIn && bookingData.checkOut && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Số khách</span>
                    <span className="font-semibold text-gray-800">
                      {bookingData.persons}
                    </span>
                  </div>
                )}
                {bookingData.checkIn && bookingData.checkOut && (
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-gray-800 font-medium">Tổng cộng</span>
                    <span className="font-bold text-blue-600">
                      {formatCurrencyVND(calculateTotalPrice())}
                    </span>
                  </div>
                )}
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isAvailable
                    ? "bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                }`}
                disabled={checkingAvailability || bookingLoading}
                onClick={
                  isAvailable ? onSubmitHandler : checkAvailabilityHandler
                }
                type="button"
              >
                {checkingAvailability
                  ? "Đang kiểm tra..."
                  : isAvailable
                    ? "Đặt ngay"
                    : "Kiểm tra phòng trống"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRoom;
