import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";
import { deleteCloudinaryImages } from "../utils/cloudinary.js";

export const addRoom = async (req, res) => {
  try {
    const {
      hotel,
      roomType,
      pricePerNight,
      description,
      amenities,
      isAvailable,
    } = req.body;

    if (!hotel || !roomType || !pricePerNight || !description) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin",
        success: false,
      });
    }

    const images = req.files ? req.files.map((file) => file.path) : [];

    const hotelData = await Hotel.findById(hotel);
    if (!hotelData) {
      return res.status(404).json({
        message: "Không tìm thấy khách sạn",
        success: false,
      });
    }

    if (Number(pricePerNight) < 0) {
      return res.status(400).json({
        message: "Giá không được âm",
        success: false,
      });
    }

    if (Number(pricePerNight) < hotelData.price) {
      return res.status(400).json({
        message: `Giá phòng phải lớn hơn hoặc bằng giá khách sạn (${hotelData.price.toLocaleString("vi-VN")} VNĐ)`,
        success: false,
      });
    }

    const newRoom = new Room({
      amenities: amenities ? JSON.parse(amenities) : [],
      description,
      hotel,
      images,
      isAvailable: isAvailable === "true",
      pricePerNight: Number(pricePerNight),
      roomType,
    });

    await newRoom.save();

    return res.status(201).json({
      message: "Thêm phòng thành công",
      room: newRoom,
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

export const getOwnersRoom = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const rooms = await Room.find()
      .populate({
        match: { owner: ownerId },
        path: "hotel",
        populate: {
          path: "owner",
          select: "name email phone",
        },
      })
      .lean();

    const filteredRooms = rooms.filter((room) => room.hotel !== null);

    return res.status(200).json({
      rooms: filteredRooms,
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

export const getAllRooms = async (_req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true }).populate({
      path: "hotel",
      populate: {
        path: "owner",
        select: "name email phone",
      },
    });

    return res.status(200).json({
      rooms,
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

export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id).populate({
      path: "hotel",
      populate: {
        path: "owner",
        select: "name email phone",
      },
    });

    if (!room) {
      return res.status(404).json({
        message: "Không tìm thấy phòng",
        success: false,
      });
    }

    return res.status(200).json({
      room,
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

export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        message: "Không tìm thấy phòng",
        success: false,
      });
    }

    await deleteCloudinaryImages(room.images);
    await Room.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Xóa phòng thành công",
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
