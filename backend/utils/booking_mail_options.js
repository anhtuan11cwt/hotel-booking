const buildBookingMailOptions = (user, booking, room, hotel) => {
  const checkInDate = new Date(booking.checkIn).toLocaleDateString("vi-VN");
  const checkOutDate = new Date(booking.checkOut).toLocaleDateString("vi-VN");

  return {
    from: process.env.SENDER_EMAIL,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2c3e50;">Xác nhận đặt phòng thành công!</h2>
        <p>Xin chào <strong>${user.name}</strong>,</p>
        <p>Cảm ơn bạn đã đặt phòng tại khách sạn của chúng tôi. Dưới đây là chi tiết đặt phòng của bạn:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Mã đơn hàng:</strong> ${booking._id}</p>
          <p><strong>Khách sạn:</strong> ${hotel.name}</p>
          <p><strong>Loại phòng:</strong> ${room.type}</p>
          <p><strong>Ngày nhận phòng:</strong> ${checkInDate}</p>
          <p><strong>Ngày trả phòng:</strong> ${checkOutDate}</p>
          <p><strong>Số lượng người:</strong> ${booking.persons}</p>
          <p><strong>Tổng chi phí:</strong> ${booking.totalPrice.toLocaleString("vi-VN")} VNĐ</p>
          <p><strong>Phương thức thanh toán:</strong> ${booking.paymentMethod}</p>
        </div>
        
        <p>Chúng tôi mong được đón tiếp bạn!</p>
        <p>Trân trọng,<br>Đội ngũ khách sạn</p>
      </div>
    `,
    subject: "Xác nhận đặt phòng thành công",
    to: user.email,
  };
};

export default buildBookingMailOptions;
