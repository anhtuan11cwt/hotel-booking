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

  useEffect(() => {
    const init = async () => {
      await checkUserLoggedIn();
    };
    init();
  }, [checkUserLoggedIn]);

  const value = {
    axios,
    checkUserLoggedIn,
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
