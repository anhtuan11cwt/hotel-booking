import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hotelsData, roomsData } from "../assets/assets";
import { AppContext } from "./AppContext.js";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [owner, setOwner] = useState(false);
  const [hotelData, setHotelData] = useState(hotelsData);
  const [roomData, setRoomData] = useState(roomsData);

  const navigate = useNavigate();

  const checkUserLoggedIn = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        if (data.user.role === "owner") {
          setOwner(data.user);
        } else {
          setUser(data.user);
        }
      }
    } catch {
      setUser(false);
      setOwner(false);
    }
  }, []);

  const fetchOwnerHotels = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/hotel/get");
      if (data.success) {
        const hotels = data.hotels.map((hotel) => ({
          address: hotel.hotelAddress,
          amenities: hotel.amenities || [],
          contactNumber: hotel.owner?.phone || "Chưa có",
          id: hotel._id,
          image: hotel.image || "",
          name: hotel.hotelName,
          ownerName: hotel.owner?.name || "Chưa có",
          price: hotel.price,
          rating: hotel.rating,
        }));
        setHotelData(hotels);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khách sạn của chủ:", error);
    }
  }, []);

  const fetchAllHotels = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/hotel/getall");
      if (data.success) {
        const hotels = data.hotels.map((hotel) => ({
          address: hotel.hotelAddress,
          amenities: hotel.amenities || [],
          id: hotel._id,
          image: hotel.image || "",
          name: hotel.hotelName,
          ownerName: hotel.owner?.name || "Chưa có",
          price: hotel.price,
          rating: hotel.rating,
        }));
        setHotelData(hotels);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tất cả khách sạn:", error);
    }
  }, []);

  const deleteHotel = async (hotelId) => {
    try {
      const { data } = await axios.delete(`/api/hotel/delete/${hotelId}`);
      if (data.success) {
        setHotelData((prev) => prev.filter((hotel) => hotel.id !== hotelId));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Lỗi khi xóa khách sạn:", error);
      return false;
    }
  };

  const fetchOwnerRooms = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/room/owner");
      if (data.success) {
        const rooms = data.rooms.map((room) => ({
          _id: room._id,
          amenities: room.amenities || [],
          description: room.description,
          hotel: {
            _id: room.hotel?._id,
            address: room.hotel?.hotelAddress,
            amenities: room.hotel?.amenities || [],
            contactNumber: room.hotel?.owner?.phone || "Chưa có",
            name: room.hotel?.hotelName,
            ownerName: room.hotel?.owner?.name || "Chưa có",
            rating: room.hotel?.rating,
          },
          images: room.images || [],
          isAvailable: room.isAvailable,
          maxGuests: room.maxGuests || 4,
          pricePerNight: room.pricePerNight,
          roomType: room.roomType,
        }));
        setRoomData(rooms);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phòng của chủ:", error);
    }
  }, []);

  const fetchAllRooms = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/room/all");
      if (data.success) {
        const rooms = data.rooms.map((room) => ({
          _id: room._id,
          amenities: room.amenities || [],
          description: room.description,
          hotel: {
            _id: room.hotel?._id,
            address: room.hotel?.hotelAddress,
            amenities: room.hotel?.amenities || [],
            contactNumber: room.hotel?.owner?.phone || "Chưa có",
            name: room.hotel?.hotelName,
            ownerName: room.hotel?.owner?.name || "Chưa có",
            rating: room.hotel?.rating,
          },
          images: room.images || [],
          isAvailable: room.isAvailable,
          maxGuests: room.maxGuests || 4,
          pricePerNight: room.pricePerNight,
          roomType: room.roomType,
        }));
        setRoomData(rooms);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tất cả phòng:", error);
    }
  }, []);

  const deleteRoom = async (roomId) => {
    try {
      const { data } = await axios.delete(`/api/room/delete/${roomId}`);
      if (data.success) {
        setRoomData((prev) => prev.filter((room) => room._id !== roomId));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Lỗi khi xóa phòng:", error);
      return false;
    }
  };

  const fetchRoomById = useCallback(async (roomId) => {
    try {
      const { data } = await axios.get(`/api/room/${roomId}`);
      if (data.success) {
        const room = data.room;
        const formattedRoom = {
          _id: room._id,
          amenities: room.amenities || [],
          description: room.description,
          hotel: {
            _id: room.hotel?._id,
            address: room.hotel?.hotelAddress,
            amenities: room.hotel?.amenities || [],
            contactNumber: room.hotel?.owner?.phone || "Chưa có",
            name: room.hotel?.hotelName,
            ownerName: room.hotel?.owner?.name || "Chưa có",
            rating: room.hotel?.rating,
          },
          images: room.images || [],
          isAvailable: room.isAvailable,
          maxGuests: room.maxGuests || 4,
          pricePerNight: room.pricePerNight,
          roomType: room.roomType,
        };
        return formattedRoom;
      }
      return null;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin phòng:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await checkUserLoggedIn();
    };
    init();
  }, [checkUserLoggedIn]);

  const value = {
    axios,
    checkUserLoggedIn,
    deleteHotel,
    deleteRoom,
    fetchAllHotels,
    fetchAllRooms,
    fetchOwnerHotels,
    fetchOwnerRooms,
    fetchRoomById,
    hotelData,
    navigate,
    owner,
    roomData,
    setHotelData,
    setOwner,
    setRoomData,
    setUser,
    user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
