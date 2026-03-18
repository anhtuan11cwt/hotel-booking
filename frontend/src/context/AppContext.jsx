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
      console.error("Error fetching owner hotels:", error);
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
      console.error("Error fetching all hotels:", error);
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
      console.error("Error deleting hotel:", error);
      return false;
    }
  };

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
    fetchAllHotels,
    fetchOwnerHotels,
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
