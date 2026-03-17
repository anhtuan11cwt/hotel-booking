import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { setUser, navigate } = useContext(AppContext);

  const handleLogin = () => {
    setUser(true);
    navigate("/");
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <button onClick={handleLogin} type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
