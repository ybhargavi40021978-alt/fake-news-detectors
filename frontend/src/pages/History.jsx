// History.jsx

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HistoryList from "../components/HistoryList";

const History = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "30px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "25px",
            padding: "30px",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "2.5rem",
              background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            📜 Analysis History
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#94a3b8",
              fontSize: "1rem",
            }}
          >
            View all previously analyzed news articles and their results.
          </p>
        </motion.div>

        {/* History Component */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <HistoryList />
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default History;