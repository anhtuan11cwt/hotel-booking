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
    const { roomId, hotelId, checkIn, checkOut, persons } = req.body;

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

    const booking = await Booking.create({
      checkIn: checkInDate,
      checkOut: checkOutDate,
      hotel: hotelId,
      isPaid: false,
      paymentMethod: "Pay at hotel",
      persons,
      room: roomId,
      status: "pending",
      totalPrice,
      user: userId,
    });

    const user = await User.findById(userId);
    await sendBookingEmail(user, booking, room, room.hotel);

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

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status: "cancelled" },
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
      cancel_url: `${origin}/`,
      line_items: [
        {
          currency: "usd",
          product_data: {
            name: roomData.hotel.hotelName,
          },
          quantity: 1,
          unit_amount: Math.round(booking.totalPrice * 100),
        },
      ],
      mode: "payment",
      success_url: `${origin}/loader/my-bookings`,
    });

    booking.isPaid = true;
    booking.status = "confirmed";
    await booking.save();

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
