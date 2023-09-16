import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }

      const { data } = await axios.post(
        "https://loginregistermernfrontend.onrender.com",
        {},
        { withCredentials: true }
      );

      const { status, user } = data;
      setUsername(user);

      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/register");
  };

  return (
    <div>
      <div className="flex flex-col text-center text-4xl jutify-center">
        <h1 className="my-10">Home</h1>
        <h2 className="my-5">Welcome {username}</h2>
        <button onClick={Logout} className="text-xl text-red-300">
          Logout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
