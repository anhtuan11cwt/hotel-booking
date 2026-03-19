import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    checkIn: {
      required: true,
      type: Date,
    },
    checkOut: {
      required: true,
      type: Date,
    },
    hotel: {
      ref: "Hotel",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    isPaid: {
      default: false,
      type: Boolean,
    },
    paymentMethod: {
      default: "Pay at hotel",
      enum: ["Stripe", "Pay at hotel"],
      type: String,
    },
    persons: {
      required: true,
      type: Number,
    },
    room: {
      ref: "Room",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      default: "pending",
      enum: ["confirmed", "pending", "cancelled"],
      type: String,
    },
    totalPrice: {
      required: true,
      type: Number,
    },
    user: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
