import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { formatCurrencyVND } from "../utils/currency";

const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100";
    case "pending":
      return "bg-yellow-100";
    case "cancelled":
      return "bg-red-100";
    default:
      return "bg-gray-100";
  }
};

const getStatusTextColor = (status) => {
  switch (status) {
    case "confirmed":
      return "text-green-700";
    case "pending":
      return "text-yellow-700";
    case "cancelled":
      return "text-red-700";
    default:
      return "text-gray-700";
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "confirmed":
      return "Đã xác nhận";
    case "pending":
      return "Đang chờ xử lý";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "cancelled":
      return <XCircle className="w-4 h-4" />;
    default:
      return null;
  }
};

const MyBookings = () => {
  const { axios, user, navigate } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBookings = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đặt phòng:", error);
    } finally {
      setLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    fetchMyBookings();
  }, [fetchMyBookings]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.delete(`/api/bookings/cancel/${bookingId}`);
      if (data.success) {
        toast.success("Hủy đặt phòng thành công");
        fetchMyBookings();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi hủy đặt phòng");
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      const { data } = await axios.post("/api/bookings/stripe-payment", {
        bookingId,
      });
      if (data.success) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi thanh toán");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="my-bookings-page py-12 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Vui lòng đăng nhập để xem đơn đặt phòng
        </h2>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/login")}
          type="button"
        >
          Đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div className="my-bookings-page py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Đơn đặt phòng của tôi
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Xem và quản lý các đơn đặt phòng của bạn
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Bạn chưa có đơn đặt phòng nào</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-sm">
            <div className="col-span-4">Khách sạn & Phòng</div>
            <div className="col-span-3">Nhận/Trả phòng</div>
            <div className="col-span-3">Thanh toán</div>
            <div className="col-span-2 text-center">Thao tác</div>
          </div>

          <div className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <div
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:items-center hover:bg-gray-50 transition-colors duration-150"
                key={booking._id}
              >
                <div className="md:col-span-4">
                  <div className="flex gap-4">
                    <img
                      alt={booking.room?.roomType || "Phòng"}
                      className="w-24 h-20 object-cover rounded-lg shrink-0"
                      src={
                        booking.room?.images?.[0] ||
                        "https://via.placeholder.com/100x80"
                      }
                    />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                        {booking.hotel?.hotelName || "Khách sạn"}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm">
                        {booking.room?.roomType || "Phòng"}
                      </p>
                      <div className="flex items-center gap-1 text-gray-500 text-xs md:text-sm mt-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">
                          {booking.hotel?.hotelAddress || "Địa chỉ"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs md:text-sm mt-1">
                        <User className="w-3 h-3 shrink-0" />
                        <span>{booking.persons || 1} khách</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <div className="flex items-start gap-2 text-sm">
                    <Calendar className="w-4 h-4 mt-0.5 text-gray-500 shrink-0" />
                    <div className="text-gray-700">
                      <p className="font-medium">
                        {new Date(booking.checkIn).toLocaleDateString("vi-VN", {
                          day: "numeric",
                          month: "short",
                          weekday: "short",
                        })}
                      </p>
                      <p className="text-gray-500 text-xs">→</p>
                      <p className="font-medium">
                        {new Date(booking.checkOut).toLocaleDateString(
                          "vi-VN",
                          {
                            day: "numeric",
                            month: "short",
                            weekday: "short",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CreditCard className="w-4 h-4 text-gray-500 shrink-0" />
                      <span className="truncate">
                        {booking.paymentMethod === "Stripe"
                          ? "Thanh toán qua Stripe"
                          : "Thanh toán tại khách sạn"}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {formatCurrencyVND(booking.totalPrice)}
                    </p>
                    {booking.isPaid ? (
                      <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Đã thanh toán
                      </span>
                    ) : (
                      <button
                        className="cursor-pointer px-3 py-1.5 text-white text-xs font-medium rounded-lg hover:opacity-90 transition-colors duration-150"
                        onClick={() => handlePayment(booking._id)}
                        style={{ backgroundColor: "var(--color-primary)" }}
                        type="button"
                      >
                        Thanh toán ngay
                      </button>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-3 md:justify-center">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status,
                    )} ${getStatusTextColor(booking.status)}`}
                  >
                    {getStatusIcon(booking.status)}
                    <span>{getStatusLabel(booking.status)}</span>
                  </div>
                  {booking.status !== "cancelled" && (
                    <button
                      aria-label="Hủy đặt phòng"
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-150 cursor-pointer"
                      onClick={() => handleCancelBooking(booking._id)}
                      type="button"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
