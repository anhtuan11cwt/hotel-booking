import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    amenities: {
      default: [],
      type: [String],
    },
    description: {
      required: true,
      type: String,
    },
    hotel: {
      ref: "Hotel",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    images: {
      default: [],
      type: [String],
    },
    isAvailable: {
      default: true,
      type: Boolean,
    },
    maxGuests: {
      default: 4,
      type: Number,
    },
    pricePerNight: {
      required: true,
      type: Number,
    },
    roomType: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
