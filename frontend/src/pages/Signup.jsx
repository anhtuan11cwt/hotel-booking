import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Signup = () => {
  const { setUser, navigate } = useContext(AppContext);

  const handleSignup = () => {
    setUser(true);
    navigate("/");
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <button onClick={handleSignup} type="button">
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
