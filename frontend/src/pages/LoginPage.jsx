import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ParticlesBackground from "../components/ParticlesBackground";
import GradientMesh from "../components/GradientMesh";
import CursorGlow from "../components/CursorGlow";
import OrbitIcons from "../components/OrbitIcons";
import ParallaxContainer from "../components/ParallaxContainer";

export default function LoginPage() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {

    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("username", userName);
    formData.append("password", password);

    try {

      const res = await api.post("/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      const role = res.data.role;
      localStorage.setItem("role", role);

      if (role === "ROLE_ADMIN") {
        window.location.href = "/";
      }
      else if (role === "ROLE_USER") {
        window.location.href = "/user-dashboard";
      }

    }
    catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden px-4">

      {/* Background Effects */}
      <GradientMesh />
      <ParticlesBackground />
      <CursorGlow />
      <OrbitIcons />

      <ParallaxContainer>

        {/* Floating icons (hidden on small screens) */}
        <div className="hidden sm:block absolute top-24 left-24 text-white/20 text-4xl lg:text-5xl animate-bounce">
          ⚽
        </div>

        <div className="hidden sm:block absolute bottom-24 right-32 text-white/20 text-4xl lg:text-5xl animate-pulse">
          🏀
        </div>

        <div className="hidden sm:block absolute top-40 right-20 text-white/20 text-4xl lg:text-5xl animate-bounce">
          🏆
        </div>

        {/* Login Card */}
        <motion.div

          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}

          whileHover={{
            rotateX: 6,
            rotateY: -6,
            scale: 1.02
          }}

          className="
          glass-card
          w-full max-w-sm
          p-6 sm:p-8 lg:p-10
          text-white
          relative
          z-10
          "

        >

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-5 sm:mb-6 neon-text">
            🏆 SportsFest
          </h2>

          <p className="text-center text-xs sm:text-sm text-muted-foreground mb-5 sm:mb-6">
            Sign in to manage your events
          </p>

          {/* Form */}
          <form onSubmit={login} className="space-y-3 sm:space-y-4">

            <input
              className="search-input w-full"
              placeholder="Email / Username"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
            />

            <input
              type="password"
              className="search-input w-full"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <motion.button

              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}

              className="
              w-full
              py-2.5
              rounded-lg
              bg-gradient-to-r
              from-blue-500
              to-purple-600
              text-sm sm:text-base
              font-semibold
              shadow-lg
              hover:shadow-purple-500/40
              transition
              "
            >
              Login
            </motion.button>

          </form>

          {/* Register link */}
          <div className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-muted-foreground">

            Don't have an account?

            <Link
              to="/register"
              className="ml-1 text-blue-400 hover:text-blue-300 hover:underline"
            >
              Create User Account
            </Link>

          </div>

        </motion.div>

      </ParallaxContainer>

    </div>

  );

}