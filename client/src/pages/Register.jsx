import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "https://loginregistermernbackend.onrender.com/register",
        {
          ...inputValue,
        },
        { withCredentials: true }
      )
      .then((res) => {
        const { message, success } = res.data;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          handleError(message);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold text-center m-20">Register Page</h1>
      <form
        onSubmit={handleSubmit}
        className="text-2xl align-center flex flex-col width-1/2 mx-auto"
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          className="border border-solid rounded-lg"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="border border-solid rounded-lg"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="border border-solid rounded-lg"
        />
        <button type="submit" className="border border-solid rounded-lg my-5">
          Submit
        </button>
        <div className="text-xl">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-200">
            Login
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
