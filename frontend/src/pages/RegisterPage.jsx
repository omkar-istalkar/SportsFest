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

    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden">

      {/* Background Effects */}

      <GradientMesh />
      <ParticlesBackground />
      <CursorGlow />
      <OrbitIcons />

      {/* Parallax container */}

      <ParallaxContainer>

        {/* Floating sports icons */}

        <div className="absolute top-24 left-24 text-white/20 text-5xl animate-bounce">
          ⚽
        </div>

        <div className="absolute bottom-24 right-32 text-white/20 text-5xl animate-pulse">
          🏀
        </div>

        <div className="absolute top-40 right-20 text-white/20 text-5xl animate-bounce">
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
          p-10
          w-[380px]
          text-white
          relative
          z-10
          "

        >

          {/* Title */}

          <h2 className="text-3xl font-bold text-center mb-6 neon-text">
            🏆 SportsFest
          </h2>

          <p className="text-center text-sm text-muted-foreground mb-6">
            Create your account
          </p>

          {/* Form */}

          <form onSubmit={handleSubmit} className="space-y-4">

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
              py-2
              rounded-lg
              bg-gradient-to-r
              from-blue-500
              to-purple-600
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

          <div className="mt-6 text-center text-sm text-muted-foreground">

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