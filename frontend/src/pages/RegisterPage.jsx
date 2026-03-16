import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

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

  const styles = {

    page: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#667eea,#764ba2)",
      fontFamily: "Arial"
    },

    card: {
      width: "350px",
      padding: "40px",
      borderRadius: "12px",
      background: "white",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      textAlign: "center",
      animation: "fadeIn 0.6s ease"
    },

    title: {
      marginBottom: "25px",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333"
    },

    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      outline: "none"
    },

    button: {
      width: "100%",
      padding: "12px",
      background: "#667eea",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "0.3s"
    }

  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h2 style={styles.title}>
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e)=>e.target.style.background="#5a67d8"}
            onMouseOut={(e)=>e.target.style.background="#667eea"}
          >
            Register
          </button>

        </form>

      </div>

    </div>

  );

}