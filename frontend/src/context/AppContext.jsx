import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hotelsData, roomsData } from "../assets/assets";
import { AppContext } from "./AppContext.js";

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [owner, setOwner] = useState(null);
  // Khởi tạo trực tiếp từ dữ liệu tĩnh, dễ thay bằng API call sau này
  const [hotelData, setHotelData] = useState(hotelsData);
  const [roomData, setRoomData] = useState(roomsData);

  const navigate = useNavigate();

  const value = {
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
