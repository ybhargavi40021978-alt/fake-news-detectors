// Stats.jsx (Enhanced with Logo)
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Stats = () => {
  const [stats, setStats] = useState({
    total: 0,
    real: 0,
    fake: 0,
    accuracy: 0,
  });

  useEffect(() => {
    const loadStats = () => {
      const history = JSON.parse(localStorage.getItem("analysisHistory")) || [];

      const total = history.length;
      const real = history.filter((item) => item.result === "REAL").length;
      const fake = history.filter((item) => item.result === "FAKE").length;
      const accuracy = total > 0 ? Math.round((real / total) * 100) : 0;

      setStats({
        total,
        real,
        fake,
        accuracy,
      });
    };

    loadStats();

    window.addEventListener("storage", loadStats);

    return () => {
      window.removeEventListener("storage", loadStats);
    };
  }, []);

  const cards = [
    {
      icon: "📊",
      title: "Total Analysis",
      value: stats.total,
      color: "#3b82f6",
      logo: "🔍"
    },
    {
      icon: "✅",
      title: "Real News",
      value: stats.real,
      color: "#22c55e",
      logo: "📰"
    },
    {
      icon: "❌",
      title: "Fake News",
      value: stats.fake,
      color: "#ef4444",
      logo: "⚠️"
    },
    {
      icon: "🎯",
      title: "Accuracy",
      value: `${stats.accuracy}%`,
      color: "#f59e0b",
      logo: "🏆"
    },
  ];

  return (
    <section style={{ marginTop: "30px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              rotateY: 10,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "25px",
              color: "white",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                fontSize: "4rem",
                opacity: 0.1,
              }}
            >
              {card.logo}
            </div>

            <div
              style={{
                fontSize: "2rem",
                marginBottom: "10px",
              }}
            >
              {card.icon}
            </div>

            <h3
              style={{
                color: "#cbd5e1",
                marginBottom: "10px",
              }}
            >
              {card.title}
            </h3>

            <h1
              style={{
                color: card.color,
                fontSize: "2rem",
                margin: 0,
              }}
            >
              {card.value}
            </h1>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;