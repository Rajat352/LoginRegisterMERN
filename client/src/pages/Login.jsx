import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

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
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "https://loginregistermernbackend.onrender.com/login",
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
    });
  };
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold text-center m-20">Login Page</h1>
      <form
        onSubmit={handleSubmit}
        className="text-2xl align-center flex flex-col width-1/2 mx-auto"
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="border border-solid rounded-lg"
        />
        <label htmlFor="password">Password</label>
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
          Don&apos;t have an account?
          <Link to="/register" className="text-blue-200">
            Register
          </Link>
        </div>
        <div className="text-xl">
          Forgot your password?
          <Link to="/request-password-reset" className="text-blue-200">
            Reset
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
