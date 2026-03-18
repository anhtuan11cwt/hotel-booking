import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    amenities: {
      default: [],
      type: [String],
    },
    hotelAddress: {
      required: true,
      type: String,
    },
    hotelName: {
      required: true,
      type: String,
    },
    image: {
      type: String,
    },
    owner: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    price: {
      required: true,
      type: Number,
    },
    rating: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
