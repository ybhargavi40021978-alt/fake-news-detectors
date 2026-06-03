// Dashboard.jsx (Updated with Home button)
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Stats from "../components/Stats";
import NewsForm from "../components/NewsForm";
import Footer from "../components/Footer";
import HistoryList from "../components/HistoryList";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
        position: "relative",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Floating Background Glow 1 */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "-150px",
          left: "-150px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(59,130,246,0.25)",
          filter: "blur(120px)",
        }}
      />

      {/* Floating Background Glow 2 */}
      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "-150px",
          right: "-150px",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "rgba(139,92,246,0.25)",
          filter: "blur(120px)",
        }}
      />

      {/* Custom Navbar with Home and Profile Button */}
      <div
        style={{
          background: "rgba(15,23,42,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          padding: "15px 30px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              style={{
                width: "45px",
                height: "45px",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                boxShadow: "0 0 20px rgba(59,130,246,0.3)",
              }}
            >
              🤖
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.3rem",
                  background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AI Truth Engine
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.7rem",
                  color: "#94a3b8",
                }}
              >
                Multilingual Fact Checker
              </p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div
            style={{
              display: "flex",
              gap: "25px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {/* Home Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                border: "none",
                color: "white",
                padding: "8px 18px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>🏠</span>
              Home
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById("dashboard");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                color: "#cbd5e1",
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: "500",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#60a5fa")}
              onMouseLeave={(e) => (e.target.style.color = "#cbd5e1")}
            >
              Dashboard
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById("analyze");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                color: "#cbd5e1",
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: "500",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#60a5fa")}
              onMouseLeave={(e) => (e.target.style.color = "#cbd5e1")}
            >
              Analyze
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById("history");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                color: "#cbd5e1",
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: "500",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#60a5fa")}
              onMouseLeave={(e) => (e.target.style.color = "#cbd5e1")}
            >
              History
            </motion.a>

            {/* Profile Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/profile")}
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                border: "none",
                color: "white",
                padding: "8px 18px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginLeft: "10px",
              }}
            >
              <span>👤</span>
              Profile
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "30px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Welcome Section - Dashboard Section */}
        <div id="dashboard">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "25px",
              padding: "30px",
              marginBottom: "30px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
              <div style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
                boxShadow: "0 0 30px rgba(59,130,246,0.5)"
              }}>
                🤖
              </div>
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AI Truth Engine
                </h1>
                <p
                  style={{
                    marginTop: "10px",
                    color: "#cbd5e1",
                    fontSize: "1.1rem",
                  }}
                >
                  Welcome Back 👋 | Multilingual AI-Powered Fact Verification
                </p>
              </div>
            </div>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "15px",
              }}
            >
              Analyze news in English, Hindi, Tamil, Telugu, Malayalam, Kannada, Bengali, Spanish, French, German, Chinese, Japanese, or Arabic using AI-powered verification.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Stats />
        </motion.div>

        {/* News Analysis Section - Analyze Section */}
        <div id="analyze">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: "30px",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "25px",
              padding: "25px",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              🌐 Analyze News in Any Language
            </h2>

            <NewsForm />
          </motion.div>
        </div>

        {/* History Section */}
        <div id="history">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: "30px",
            }}
          >
            <HistoryList />
          </motion.div>
        </div>

        {/* AI Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {[
            {
              icon: "⚡",
              title: "Fast Analysis",
              desc: "Get results within seconds.",
            },
            {
              icon: "🧠",
              title: "AI Powered",
              desc: "Advanced machine learning models.",
            },
            {
              icon: "🛡️",
              title: "Reliable",
              desc: "Fact verification assistance.",
            },
            {
              icon: "🌐",
              title: "13+ Languages",
              desc: "English, Hindi, Tamil, Telugu, Malayalam, Kannada, Bengali, Spanish, French, German, Chinese, Japanese, Arabic",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                rotateX: 5,
              }}
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "25px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem" }}>{item.icon}</div>

              <h3>{item.title}</h3>

              <p style={{ color: "#94a3b8" }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;