import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function LoginPage() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {

    e.preventDefault();

    console.log("====== LOGIN ATTEMPT ======");
    console.log("Username entered:", userName);
    console.log("Password entered:", password);

    const formData = new URLSearchParams();

    formData.append("username", userName);
    formData.append("password", password);

    console.log("Payload being sent:", formData.toString());

    try {

      const res = await api.post("/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      console.log("Login response:", res.data);

      alert("Login successful");

      const role = res.data.role;

      localStorage.setItem("role", role);

      if (role === "ROLE_ADMIN") {
        window.location.href = "/";
      }

      else if (role === "ROLE_USER") {
        window.location.href = "/events";
      }

      else {
        window.location.href = "/";
      }

    }
    catch (err) {

      console.error("LOGIN ERROR:", err);

      console.error("Server error response:", err.response?.data);

      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-lg p-8 rounded w-[350px]">

        <h2 className="text-xl font-bold mb-4 text-center">
          SportsFest Login
        </h2>

        <form onSubmit={login}>

          <input
            className="border p-2 w-full mb-3 rounded"
            placeholder="Email / Username"
            value={userName}
            onChange={(e) => {

              console.log("Typing username:", e.target.value);
              setUserName(e.target.value);

            }}
          />

          <input
            type="password"
            className="border p-2 w-full mb-3 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => {

              console.log("Typing password:", e.target.value);
              setPassword(e.target.value);

            }}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        <div className="mt-4 text-center">

          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Create User Account
          </Link>

        </div>

        <div className="mt-6 border-t pt-4 text-center">

          <p className="text-gray-600 mb-2">
            Looking for events?
          </p>

          <Link
            to="/events"
            className="block bg-green-600 text-white p-2 rounded mb-2 hover:bg-green-700 transition"
          >
            Browse Events
          </Link>

          <Link
            to="/registration-status"
            className="block bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
          >
            Check Registration Status
          </Link>

        </div>

      </div>

    </div>
  );
}