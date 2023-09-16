import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const url = new URLSearchParams(useLocation().search);
  const token = url.get("token");
  const userId = url.get("id");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://loginregistermernbackend.onrender.com/reset-password",
        {
          userId,
          token,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res.data) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold text-center m-20">
        Change Password Page
      </h1>
      <form
        onSubmit={handleSubmit}
        className="text-2xl align-center flex flex-col width-1/2 mx-auto"
      >
        <label htmlFor="password">Enter New Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="border border-solid rounded-lg"
        />
        <button type="submit" className="border border-solid rounded-lg my-5">
          Submit
        </button>
        <div className="text-xl">
          <Link to="/" className="text-blue-200">
            Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
