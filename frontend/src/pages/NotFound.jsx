// NotFound.jsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(59,130,246,0.25)",
          filter: "blur(120px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          maxWidth: "700px",
          width: "100%",
          textAlign: "center",
          padding: "50px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          zIndex: 1,
        }}
      >
        <motion.h1
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            fontSize: "8rem",
            margin: 0,
            fontWeight: "900",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </motion.h1>

        <h2
          style={{
            color: "white",
            marginTop: "10px",
            fontSize: "2rem",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "15px",
            fontSize: "1.1rem",
            lineHeight: "1.8",
          }}
        >
          The page you are looking for does not exist or may have been moved.
          Please return to the dashboard and continue exploring the AI Truth
          Engine.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: "30px" }}
        >
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "white",
              padding: "14px 28px",
              borderRadius: "14px",
              fontWeight: "bold",
              display: "inline-block",
              boxShadow: "0 0 25px rgba(59,130,246,0.4)",
            }}
          >
            🏠 Back to Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;