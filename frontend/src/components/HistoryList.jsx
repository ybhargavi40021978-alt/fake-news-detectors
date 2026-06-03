// HistoryList.jsx (Enhanced with Language Badge)
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HistoryList = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("analysisHistory")) || [];
    setHistory(saved);

    const handleStorageUpdate = () => {
      const updated = JSON.parse(localStorage.getItem("analysisHistory")) || [];
      setHistory(updated);
    };

    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("analysisHistory");
    setHistory([]);
    window.dispatchEvent(new Event("storage"));
  };

  const getLanguageFlag = (langCode) => {
    const flags = {
      en: "🇬🇧",
      hi: "🇮🇳",
      es: "🇪🇸",
      fr: "🇫🇷",
      de: "🇩🇪",
      zh: "🇨🇳",
      ja: "🇯🇵",
      ar: "🇸🇦",
    };
    return flags[langCode] || "🌐";
  };

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(15px)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          📜 Analysis History
          {history.length > 0 && (
            <span
              style={{
                fontSize: "0.8rem",
                background: "rgba(59,130,246,0.3)",
                padding: "2px 8px",
                borderRadius: "20px",
              }}
            >
              {history.length} items
            </span>
          )}
        </h2>

        <button
          onClick={clearHistory}
          style={{
            background: "#dc2626",
            border: "none",
            color: "white",
            padding: "8px 15px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🗑 Clear All
        </button>
      </div>

      {history.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ color: "#94a3b8" }}>No analysis history available.</p>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            Start analyzing news to see your history here!
          </p>
        </div>
      ) : (
        history.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            style={{
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "15px",
              background:
                item.result === "REAL"
                  ? "rgba(34,197,94,0.1)"
                  : "rgba(239,68,68,0.1)",
              border:
                item.result === "REAL"
                  ? "1px solid rgba(34,197,94,0.2)"
                  : "1px solid rgba(239,68,68,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <h4 style={{ margin: 0 }}>
                {item.result === "REAL" ? "✅ REAL NEWS" : "❌ FAKE NEWS"}
              </h4>
              {item.language && (
                <span
                  style={{
                    fontSize: "0.8rem",
                    background: "rgba(255,255,255,0.1)",
                    padding: "2px 8px",
                    borderRadius: "12px",
                  }}
                >
                  {getLanguageFlag(item.language)} {item.language.toUpperCase()}
                </span>
              )}
            </div>

            <p style={{ margin: "8px 0", color: "#cbd5e1" }}>
              {item.text.length > 150 ? `${item.text.substring(0, 150)}...` : item.text}
            </p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                fontSize: "0.8rem",
                color: "#94a3b8",
              }}
            >
              <span>📊 Confidence: {item.confidence}%</span>
              <span>📅 {item.date}</span>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default HistoryList;