// Footer.jsx (Enhanced)
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      style={{
        background: "rgba(15,23,42,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "40px 30px 20px",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
        }}
      >
        {/* Brand Column */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
              }}
            >
              🤖
            </div>
            <h3 style={{ margin: 0, color: "white" }}>AI Truth Engine</h3>
          </div>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: "1.5" }}>
            Empowering users with AI-powered fact verification across multiple languages.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: "white", marginBottom: "15px" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["Dashboard", "Analyze News", "History"].map((link) => (
              <li key={link} style={{ marginBottom: "8px" }}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const id = link.toLowerCase().replace(" ", "");
                    const element = document.getElementById(id === "analyzenews" ? "analyze" : id === "dashboard" ? "dashboard" : "history");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#60a5fa")}
                  onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div>
          <h4 style={{ color: "white", marginBottom: "15px" }}>Features</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["Multilingual Support", "AI-Powered Analysis", "Real-time Verification", "History Tracking"].map((feature) => (
              <li key={feature} style={{ color: "#94a3b8", marginBottom: "8px", fontSize: "0.9rem" }}>
                • {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 style={{ color: "white", marginBottom: "15px" }}>Connect</h4>
          <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
            {["🐦", "💼", "📧", "💬"].map((icon, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.1, y: -3 }}
                href="#"
                style={{
                  fontSize: "1.5rem",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
          <p style={{ color: "#64748b", fontSize: "0.8rem" }}>
            support@aitruthengine.com
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "30px",
          marginTop: "30px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          color: "#64748b",
          fontSize: "0.8rem",
        }}
      >
        © {currentYear} AI Truth Engine | Fake News Detector | All Rights Reserved
      </div>
    </motion.footer>
  );
};

export default Footer;