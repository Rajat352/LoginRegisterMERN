import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import axios from "axios";

const RequestPasswordReset = () => {
    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:5000/request-password-reset",
                {
                    email,
                },
                { withCredentials: true }
            );
            setTimeout(() => {
                window.open(res.data, "_blank");
            }, 1000);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-center m-20">
                Request Password Reset Page
            </h1>
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

export default RequestPasswordReset;
