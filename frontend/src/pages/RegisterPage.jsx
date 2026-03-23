import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import ParticlesBackground from "../components/ParticlesBackground";
import GradientMesh from "../components/GradientMesh";
import CursorGlow from "../components/CursorGlow";
import OrbitIcons from "../components/OrbitIcons";
import ParallaxContainer from "../components/ParallaxContainer";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const res = await register(form);
      alert(res);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
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

        {/* Register Card */}
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
            Create your account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="search-input w-full"
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="search-input w-full"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="search-input w-full"
            />

            <motion.button

              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}

              type="submit"

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
              Register
            </motion.button>

          </form>

          {/* Login link */}
          <div className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-muted-foreground">

            Already have an account?

            <Link
              to="/login"
              className="ml-1 text-blue-400 hover:text-blue-300 hover:underline"
            >
              Login
            </Link>

          </div>

        </motion.div>

      </ParallaxContainer>

    </div>

  );

}