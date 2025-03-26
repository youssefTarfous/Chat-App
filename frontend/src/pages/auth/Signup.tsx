import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface data {
  username: string;
  email: string;
  password: string;
}
const googleLogin = () => {
  window.open(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/google/callback`,
    "_self"
  );
};
const Signup: React.FC = () => {
  const [data, setData] = useState<data>({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, username, password } = data;
    if (!email || !username || !password) return "All fields are required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      // Simulating API request - replace with real API call
      const response = await axios.post("https://yourapi.com/signup", data);
      console.log("Signup successful:", response.data);
      setData({ email: "", username: "", password: "" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-4xl text-dark-secondary text-center">Sign Up</h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block ml-2 text-sm font-medium text-dark-secondary"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={changeHandler}
              className="w-full mt-2 p-3 border text-dark-secondary border-gray-300 rounded-full placeholder:text-dark-secondary placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="m@gmail.com"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block ml-2 text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={changeHandler}
              className="w-full mt-2 p-3 border border-gray-300 rounded-full text-dark-secondary placeholder:text-dark-secondary placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block ml-2 text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={changeHandler}
              className="w-full mt-2 p-3 border border-gray-300 rounded-full text-dark-secondary placeholder:text-dark-secondary placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="**********"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 text-white cursor-pointer font-semibold rounded-full duration-300 transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={
              loading || !data.email || !data.username || !data.password
            }
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mb-4 text-2xl text-dark-secondary mt-4">
          Or Continue With
        </div>
        <div className="flex gap-2 mb-4">
          <button
            onClick={googleLogin}
            className="w-full py-3 flex gap-2 lg:gap-3 hover:bg-dark-secondary hover:text-white border-2 border-dark-secondary  items-center justify-center px-4 text-dark-secondary duration-300 transition-all rounded-full  focus:outline-none cursor-pointer"
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt=""
              className="w-6 h-6"
            />{" "}
            Google
          </button>
          <button className="w-full py-3 flex gap-2 hover:bg-dark-secondary cursor-pointer hover:text-white border-2 border-dark-secondary items-center justify-center px-4 text-dark-secondary duration-300 transition-all rounded-full">
            <img
              src="https://img.icons8.com/color/48/000000/discord-logo.png"
              alt=""
              className="w-6 h-6"
            />
            Discord
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link className="text-blue-500 hover:underline ml-2" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
