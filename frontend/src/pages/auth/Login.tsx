import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
interface data {
  email: string;
  password: string;
}
function Login() {
  const [data, setdata] = useState<data>({
    email: "",
    password: "",
  });
  const googleLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google/callback`, "_self");
  }
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // React Query mutation for login
  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("https://yourapi.com/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    },
    onError: (err: Error) => {
      setError(err?.message || "Invalid username or password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    loginMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <h2 className="text-4xl text-dark-secondary text-center">Login</h2>

          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block ml-2 text-sm font-medium text-dark-secondary "
              >
                email
              </label>
              <input
                type="email"
                id="username"
                name="email"
                value={data.email}
                onChange={changeHandler}
                className="w-full mt-2 p-3 border text-dark-secondary border-gray-300 rounded-full placeholder:text-dark-secondary placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="m@gmail.com"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block ml-2 text-sm font-medium text-gray-600 "
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
              className="w-full py-3 px-4 cursor-pointer bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Log In"}
            </button>
          </div>
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
          <a
            href="https://discord.com/oauth2/authorize?client_id=1352659331480289312&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fcallback&scope=identify+email"
            className="w-full py-3 flex gap-2 lg:gap-3 hover:bg-dark-secondary hover:text-white border-2 border-dark-secondary  items-center justify-center px-4 text-dark-secondary duration-300 transition-all rounded-full  focus:outline-none cursor-pointer"
          >
            <img
              src="https://img.icons8.com/color/48/000000/discord-logo.png"
              alt=""
              className="w-6 h-6"
            />{" "}
            Discord
          </a>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-center text-gray-600">
            Don't have an Account?
            <Link
              className="text-blue-500 hover:underline ml-2 duration-300 transition-all"
              to={"/signup"}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
