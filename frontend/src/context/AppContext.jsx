import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext.js";

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [owner, setOwner] = useState(null);
  const navigate = useNavigate();

  const value = {
    navigate,
    owner,
    setOwner,
    setUser,
    user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
