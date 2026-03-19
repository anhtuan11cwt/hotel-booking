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
    const checkToastId = toast.loading("Đang kiểm tra phòng trống...");

    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        roomId: id,
      });

      toast.dismiss(checkToastId);

      if (data.success) {
        setIsAvailable(data.isAvailable);
        if (data.isAvailable) {
          toast.success("Phòng còn trống! Bạn có thể đặt ngay.");
        } else {
          toast.error("Phòng đã được đặt trong khoảng thời gian này.");
        }
      }
    } catch (error) {
      toast.dismiss(checkToastId);
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        toast.error("Server đang khởi động. Vui lòng thử lại sau 60 giây!");
      } else {
        toast.error(
          error.response?.data?.message || "Lỗi kiểm tra phòng trống",
        );
      }
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
    const toastId = toast.loading(
      "Đang kết nối đến server... (có thể mất 30-60 giây nếu server đang khởi động)",
    );

    try {
      const { data } = await axios.post(
        "/api/bookings/book",
        {
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          hotelId: room.hotel._id,
          paymentMethod: bookingData.paymentMethod,
          persons: bookingData.persons,
          roomId: id,
        },
        {
          timeout: 120000,
        },
      );

      toast.dismiss(toastId);

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
      toast.dismiss(toastId);
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        toast.error("Server đang khởi động. Vui lòng thử lại sau 60 giây!");
      } else {
        toast.error(error.response?.data?.message || "Lỗi khi đặt phòng");
      }
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
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Không tìm thấy phòng</p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl single-room-page">
      <div className="flex lg:flex-row flex-col gap-6 bg-white shadow-lg p-8 rounded-2xl">
        <div className="flex-1">
          <h1 className="mb-4 font-bold text-gray-800 text-4xl">
            {room.roomType}
          </h1>

          <div className="flex items-center gap-2 mb-3 text-gray-600">
            <MapPin className="w-5 h-5 shrink-0" />
            <span>{room.hotel.name}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>{room.hotel.address}</span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Star className="fill-current w-5 h-5 text-yellow-500" />
            <span className="font-medium text-gray-700">
              {room.hotel.rating}
            </span>
          </div>

          <div className="mt-4">
            {isAvailable ? (
              <span className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full font-medium text-green-700 text-sm">
                <CheckCircle className="w-4 h-4" />
                Còn phòng
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full font-medium text-gray-700 text-sm">
                <XCircle className="w-4 h-4" />
                Chưa kiểm tra
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:text-right">
          <div className="font-bold text-gray-800 text-3xl">
            {formatCurrencyVND(room.pricePerNight)}
            <span className="font-normal text-gray-500 text-base"> / đêm</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex lg:justify-end items-center gap-2 text-gray-600">
              <User className="w-4 h-4" />
              <span>{room.hotel.ownerName}</span>
            </div>

            <div className="flex lg:justify-end items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{room.hotel.contactNumber}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 mt-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <img
              alt={`${room.roomType} - Hình ảnh ${selectedImage + 1}`}
              className="w-full h-96 object-cover"
              src={room.images[selectedImage]}
            />
          </div>

          <div className="flex gap-4 mt-4 pb-2 overflow-x-auto">
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

          <div className="bg-white shadow-lg mt-8 p-8 rounded-2xl">
            <h2 className="mb-4 font-bold text-gray-800 text-2xl">
              Về phòng này
            </h2>
            <p className="text-gray-600 leading-relaxed">{room.description}</p>
          </div>

          <div className="bg-white shadow-lg mt-8 p-8 rounded-2xl">
            <h2 className="mb-6 font-bold text-gray-800 text-2xl">
              Tiện nghi phòng
            </h2>
            <div className="gap-4 grid grid-cols-2 md:grid-cols-3">
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

          <div className="bg-white shadow-lg mt-8 p-8 rounded-2xl">
            <h2 className="mb-6 font-bold text-gray-800 text-2xl">
              Tiện nghi khách sạn
            </h2>
            <div className="gap-4 grid grid-cols-2 md:grid-cols-3">
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
          <div className="top-8 sticky bg-white shadow-lg p-8 rounded-2xl">
            <h2 className="mb-6 font-bold text-gray-800 text-2xl">
              Đặt phòng ngay
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  className="block mb-2 font-medium text-gray-700 text-sm"
                  htmlFor="check_in_date"
                >
                  Ngày nhận phòng
                </label>
                <div className="relative">
                  <Calendar className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2" />
                  <input
                    className="py-3 pr-4 pl-10 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
                  className="block mb-2 font-medium text-gray-700 text-sm"
                  htmlFor="check_out_date"
                >
                  Ngày trả phòng
                </label>
                <div className="relative">
                  <Calendar className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2" />
                  <input
                    className="py-3 pr-4 pl-10 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
                  className="block mb-2 font-medium text-gray-700 text-sm"
                  htmlFor="guest_count"
                >
                  Số lượng khách
                </label>
                <div className="relative">
                  <Users className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2" />
                  <input
                    className="py-3 pr-4 pl-10 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
                  className="block mb-2 font-medium text-gray-700 text-sm"
                  htmlFor="payment_method"
                >
                  Phương thức thanh toán
                </label>
                <div className="relative">
                  <CreditCard className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2" />
                  <select
                    className="bg-white py-3 pr-4 pl-10 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full appearance-none"
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

              <div className="mt-6 pt-4 border-t">
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
                    <span className="font-medium text-gray-800">Tổng cộng</span>
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
                } ${checkingAvailability || bookingLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={checkingAvailability || bookingLoading}
                onClick={
                  isAvailable ? onSubmitHandler : checkAvailabilityHandler
                }
                type="button"
              >
                {bookingLoading
                  ? "Đang xử lý đặt phòng..."
                  : checkingAvailability
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
