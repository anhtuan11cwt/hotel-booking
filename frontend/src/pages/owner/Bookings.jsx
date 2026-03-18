import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Eye,
  MapPin,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { formatCurrencyVND } from "../../utils/currency";

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

const Bookings = () => {
  const { axios, owner } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHotelBookings = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/bookings/hotel");
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
    fetchHotelBookings();
  }, [fetchHotelBookings]);

  const handleConfirmBooking = async (bookingId) => {
    try {
      const { data } = await axios.put(`/api/bookings/confirm/${bookingId}`);
      if (data.success) {
        toast.success("Xác nhận đặt phòng thành công");
        fetchHotelBookings();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi xác nhận");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.delete(`/api/bookings/cancel/${bookingId}`);
      if (data.success) {
        toast.success("Hủy đặt phòng thành công");
        fetchHotelBookings();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi hủy đặt phòng");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  if (!owner) {
    return (
      <div className="owner-bookings-page py-12 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Vui lòng đăng nhập với tài khoản chủ khách sạn
        </h2>
      </div>
    );
  }

  return (
    <div className="owner-bookings-page py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Quản lý đặt phòng
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Theo dõi và quản lý các yêu cầu đặt phòng từ khách hàng
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Chưa có đơn đặt phòng nào</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-sm">
            <div className="col-span-3">Khách sạn & Phòng</div>
            <div className="col-span-2">Ngày đặt</div>
            <div className="col-span-2">Thanh toán</div>
            <div className="col-span-2">Trạng thái</div>
            <div className="col-span-3 text-center">Thao tác</div>
          </div>

          <div className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <div
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:items-center hover:bg-gray-50 transition-colors duration-150"
                key={booking._id}
              >
                <div className="md:col-span-3">
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
                        <span>
                          {booking.user?.name || "Khách"} -{" "}
                          {booking.persons || 1} khách
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
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

                <div className="md:col-span-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CreditCard className="w-4 h-4 text-gray-500 shrink-0" />
                      <span className="truncate">
                        {booking.paymentMethod || "Thanh toán tại khách sạn"}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {formatCurrencyVND(booking.totalPrice)}
                    </p>
                    <div className="flex items-center gap-1">
                      {booking.isPaid ? (
                        <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                          <CheckCircle className="w-3 h-3" />
                          Đã thanh toán
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 text-xs font-medium">
                          <XCircle className="w-3 h-3" />
                          Chưa thanh toán
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status,
                    )} ${getStatusTextColor(booking.status)}`}
                  >
                    {getStatusIcon(booking.status)}
                    <span>{getStatusLabel(booking.status)}</span>
                  </div>
                </div>

                <div className="md:col-span-3 flex flex-col md:flex-row items-start md:items-center gap-2 md:justify-center">
                  <button
                    aria-label="Xem chi tiết"
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150 cursor-pointer"
                    type="button"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {booking.status === "pending" && (
                    <>
                      <button
                        aria-label="Xác nhận"
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-150 cursor-pointer"
                        onClick={() => handleConfirmBooking(booking._id)}
                        type="button"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        aria-label="Hủy đặt phòng"
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 cursor-pointer"
                        onClick={() => handleCancelBooking(booking._id)}
                        type="button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {booking.status === "confirmed" && (
                    <button
                      aria-label="Hủy đặt phòng"
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 cursor-pointer"
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

export default Bookings;
