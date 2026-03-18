import cloudinary from "../config/cloudinary.js";
import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";

const extractPublicId = (url) => {
  if (!url) return null;
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.|%2E)/);
  return match ? match[1] : null;
};

const deleteCloudinaryImage = async (imageUrl) => {
  const publicId = extractPublicId(imageUrl);
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
};

export const registerHotel = async (req, res) => {
  try {
    const { hotelName, hotelAddress, rating, price, amenities } = req.body;
    const owner = req.user.id;
    const image = req.file ? req.file.path : undefined;

    if (!hotelName || !hotelAddress || !price) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin",
        success: false,
      });
    }

    const newHotel = new Hotel({
      amenities: amenities ? amenities.split(",") : [],
      hotelAddress,
      hotelName,
      image,
      owner,
      price,
      rating: rating || 0,
    });

    await newHotel.save();

    return res.status(201).json({
      hotel: newHotel,
      message: "Đăng ký khách sạn thành công",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Lỗi server",
      success: false,
    });
  }
};

export const getOwnerHotels = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const hotels = await Hotel.find({ owner: ownerId }).populate(
      "owner",
      "name email",
    );

    return res.status(200).json({
      hotels,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Lỗi server",
      success: false,
    });
  }
};

export const getAllHotels = async (_req, res) => {
  try {
    const hotels = await Hotel.find().populate("owner", "name email");

    return res.status(200).json({
      hotels,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Lỗi server",
      success: false,
    });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({
        message: "Không tìm thấy khách sạn",
        success: false,
      });
    }

    await deleteCloudinaryImage(hotel.image);
    await Room.deleteMany({ hotel: id });
    await Hotel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Xóa khách sạn thành công",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Lỗi server",
      success: false,
    });
  }
};
