import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/login', { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email); // Store email for later
      setIsAuthenticated(true);
      navigate('/home');
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #ffecd2, #fcb69f)",
      fontFamily: "Arial"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          width: "300px",
          textAlign: "center"
        }}
      >
        <h2 style={{ color: "#4B0082", marginBottom: "20px" }}>Login to Berribot</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px"
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#6A5ACD",
            color: "white",
            padding: "10px",
            width: "100%",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Login
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#FF4500", textDecoration: "none", fontWeight: "bold" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
