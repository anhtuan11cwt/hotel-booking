import Stripe from "stripe";
import transporter from "../config/nodemailer.js";
import Booking from "../models/booking.model.js";
import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";
import buildBookingMailOptions from "../utils/booking_mail_options.js";

const sendBookingEmail = async (user, booking, room, hotel) => {
  const mailOptions = buildBookingMailOptions(user, booking, room, hotel);

  await transporter.sendMail(mailOptions);
};

const checkAvailability = async (roomId, checkInDate, checkOutDate) => {
  const bookings = await Booking.find({
    $or: [
      {
        checkIn: { $lt: new Date(checkOutDate) },
        checkOut: { $gt: new Date(checkInDate) },
      },
    ],
    room: roomId,
    status: { $ne: "cancelled" },
  });

  return bookings.length === 0;
};

export const checkRoomAvailability = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;

    const isAvailable = await checkAvailability(roomId, checkIn, checkOut);

    res.json({
      isAvailable,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const bookRoom = async (req, res) => {
  try {
    const userId = req.user.id;
    const { roomId, hotelId, checkIn, checkOut, persons, paymentMethod } =
      req.body;

    const isAvailable = await checkAvailability(roomId, checkIn, checkOut);

    if (!isAvailable) {
      return res.status(400).json({
        message: "Phòng không còn trống",
        success: false,
      });
    }

    const room = await Room.findById(roomId).populate("hotel");

    if (!room) {
      return res.status(404).json({
        message: "Phòng không tìm thấy",
        success: false,
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
    );

    const totalPrice = room.pricePerNight * nights * persons;

    const paymentMethodLabel =
      paymentMethod === "stripe" ? "Stripe" : "Thanh toán tại khách sạn";

    const booking = await Booking.create({
      checkIn: checkInDate,
      checkOut: checkOutDate,
      hotel: hotelId,
      isPaid: false,
      paymentMethod: paymentMethodLabel,
      persons,
      room: roomId,
      status: "pending",
      totalPrice,
      user: userId,
    });

    const user = await User.findById(userId);

    try {
      await sendBookingEmail(user, booking, room, room.hotel);
    } catch (emailError) {
      console.error("Gửi email thất bại:", emailError.message);
    }

    res.status(201).json({
      booking,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getUserBooking = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ user: userId })
      .populate("room hotel")
      .sort({ createdAt: -1 });

    res.json({
      bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getHotelBooking = async (req, res) => {
  try {
    const userId = req.user.id;

    const hotels = await Hotel.find({ owner: userId });
    const hotelIds = hotels.map((hotel) => hotel._id);

    const bookings = await Booking.find({ hotel: { $in: hotelIds } })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    res.json({
      bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status: "confirmed" },
      { returnDocument: "after" },
    );

    if (!booking) {
      return res.status(404).json({
        message: "Không tìm thấy đặt phòng",
        success: false,
      });
    }

    res.json({
      booking,
      message: "Xác nhận đặt phòng thành công",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Không tìm thấy đặt phòng",
        success: false,
      });
    }

    if (new Date(booking.checkIn) < new Date()) {
      return res.status(400).json({
        message: "Không thể hủy đặt phòng đã qua ngày check-in",
        success: false,
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      booking,
      message: "Hủy đặt phòng thành công",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const stripePayment = async (req, res) => {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return res.status(500).json({
        message: "Thiếu cấu hình STRIPE_SECRET_KEY",
        success: false,
      });
    }

    const stripe = new Stripe(stripeSecretKey);
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        message: "Không tìm thấy đặt phòng",
        success: false,
      });
    }

    const roomData = await Room.findById(booking.room).populate("hotel");

    const origin = req.headers.origin;

    const session = await stripe.checkout.sessions.create({
      cancel_url: `${origin}/my-bookings`,
      line_items: [
        {
          price_data: {
            currency: "vnd",
            product_data: {
              name: `${roomData.hotel.hotelName} - ${roomData.roomType}`,
            },
            unit_amount: Math.round(booking.totalPrice),
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId: bookingId,
      },
      mode: "payment",
      success_url: `${origin}/my-bookings?payment=success&bookingId=${bookingId}`,
    });

    res.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { bookingId } = req.query;

    if (!bookingId) {
      return res.status(400).json({
        message: "Thiếu bookingId",
        success: false,
      });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        message: "Không tìm thấy đặt phòng",
        success: false,
      });
    }

    if (booking.isPaid) {
      return res.json({
        message: "Thanh toán đã được xác nhận",
        success: true,
      });
    }

    booking.isPaid = true;
    booking.paymentMethod = "Stripe";
    booking.status = "confirmed";
    await booking.save();

    res.json({
      message: "Thanh toán thành công",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
