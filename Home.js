import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]);
  const [showEmployees, setShowEmployees] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    axios.get('http://localhost:8000/users')
      .then(res => setEmails(res.data.users))
      .catch(err => console.error("Error fetching users", err));
  }, []);

  const toggleEmployees = () => {
    setShowEmployees(!showEmployees);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f0f8ff",
      fontFamily: "Arial",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px"
    }}>
      <div style={{ textAlign: "center", maxWidth: "800px", width: "100%" }}>
        <h2 style={{ color: "#4B0082" }}>
          Welcome to <span style={{ color: "#FF69B4" }}>Berribot</span>
        </h2>

        <p style={{
          fontSize: "16px",
          color: "#333",
          marginBottom: "40px",
          lineHeight: "1.6"
        }}>
          Berribot is a dynamic and forward-thinking company dedicated to building intelligent digital solutions.
          We specialize in AI-powered tools, automation systems, and full-stack platforms tailored for modern
          businesses. At Berribot, innovation meets usability, empowering our clients with smart, scalable, and
          user-friendly technologies.
        </p>

        
        {/* Contact Info */}
        <div style={{ marginBottom: "30px", color: "#555" }}>
          <h3 style={{ color: "#6A5ACD" }}>Contact Us</h3>
          <p>Email: contact@berribot.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Berribot Technologies, Coimbatore, India</p>
        </div>

        {/* Buttons */}
        <div style={{ marginBottom: "30px" }}>
          <button
            onClick={toggleEmployees}
            style={{
              backgroundColor: "#20B2AA",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "10px"
            }}
          >
            Other Registered Employees
          </button>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#FF6347",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>

        {/* Conditional Display of Registered Users */}
        {showEmployees && (
          <>
            <h3 style={{ color: "#6A5ACD" }}>Registered Emails:</h3>
            <ul style={{
              listStyle: "none",
              padding: 0,
              marginTop: "10px"
            }}>
              {emails.map((email, idx) => (
                <li
                  key={idx}
                  style={{
                    backgroundColor: "#e0ffff",
                    padding: "10px",
                    margin: "5px 0",
                    borderRadius: "5px",
                    color: "#333"
                  }}
                >
                  {email}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
