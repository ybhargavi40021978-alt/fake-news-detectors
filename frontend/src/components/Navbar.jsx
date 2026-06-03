// Navbar.jsx (AI Active with Chat Assistant)
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showAIChat, setShowAIChat] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI Assistant. How can I help you today? 🤖", sender: "ai", timestamp: new Date().toLocaleTimeString() }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setShowAIChat(false);
    }
  };

  const getAIResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes("fake news") || lowerMsg.includes("detect")) {
      return "To detect fake news, paste any news article or headline in the Analyze section. Our AI will check for credibility, source verification, and linguistic patterns to determine if it's real or fake with 85-99% accuracy! 🔍";
    }
    else if (lowerMsg.includes("language") || lowerMsg.includes("translate")) {
      return "We support 13+ languages including English, Hindi, Tamil, Telugu, Malayalam, Kannada, Bengali, Spanish, French, German, Chinese, Japanese, and Arabic. Just select your preferred language from the dropdown! 🌐";
    }
    else if (lowerMsg.includes("accuracy") || lowerMsg.includes("trust")) {
      return "Our AI model has 85-99% accuracy depending on the news complexity. We use advanced machine learning algorithms, cross-referencing with trusted sources, and linguistic analysis to ensure reliable results. 🎯";
    }
    else if (lowerMsg.includes("history") || lowerMsg.includes("save")) {
      return "All your analysis results are automatically saved in History. You can view past analyses, track patterns, and clear history anytime. Click on 'History' in the navigation menu! 📜";
    }
    else if (lowerMsg.includes("how to use") || lowerMsg.includes("guide")) {
      return "Simple! 1️⃣ Select your language 2️⃣ Paste news content 3️⃣ Click Analyze. Our AI will verify and show you results with confidence score and reason. Try it now! 📰";
    }
    else if (lowerMsg.includes("free") || lowerMsg.includes("cost")) {
      return "Yes! AI Truth Engine is completely FREE to use. No hidden charges, no subscription needed. We believe everyone deserves access to fact-checking tools! 🎉";
    }
    else if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
      return "Hello! 👋 Welcome to AI Truth Engine. How can I assist you today? You can ask me about fake news detection, supported languages, accuracy, or how to use the platform!";
    }
    else if (lowerMsg.includes("thank")) {
      return "You're welcome! 😊 Feel free to ask if you need any more help. Happy fact-checking! 🚀";
    }
    else {
      return "Thanks for your question! 🤔 I can help you with:\n• How to detect fake news\n• Supported languages\n• Accuracy of our AI\n• Viewing analysis history\n• How to use the platform\n• Any other doubts you have! Just ask! 💡";
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage);
      const aiMsg = {
        id: messages.length + 2,
        text: aiResponse,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      { id: 1, text: "Hello! I'm your AI Assistant. How can I help you today? 🤖", sender: "ai", timestamp: new Date().toLocaleTimeString() }
    ]);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
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
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              <Link to="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>
                Dashboard
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              <Link to="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>
                Analyze
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              <Link to="/history" style={{ color: "inherit", textDecoration: "none" }}>
                History
              </Link>
            </motion.div>
          </div>

          {/* Status Badge - Opens Chat Assistant */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAIChat(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(34,197,94,0.15)",
              padding: "5px 12px",
              borderRadius: "20px",
              border: "1px solid rgba(34,197,94,0.3)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                background: "#22c55e",
                borderRadius: "50%",
                animation: "pulse 2s infinite",
              }}
            />
            <span style={{ fontSize: "0.8rem", color: "#86efac" }}>
              AI Active • Ask Me!
            </span>
          </motion.div>
        </div>

        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>
      </motion.nav>

      {/* AI Chat Assistant Modal */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(10px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setShowAIChat(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              style={{
                background: "linear-gradient(135deg, #1e293b, #0f172a)",
                borderRadius: "25px",
                width: "90%",
                maxWidth: "600px",
                height: "80vh",
                maxHeight: "700px",
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div
                style={{
                  padding: "20px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(59,130,246,0.1)",
                  borderRadius: "25px 25px 0 0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                    }}
                  >
                    🤖
                  </div>
                  <div>
                    <h3 style={{ margin: 0, color: "white" }}>AI Assistant</h3>
                    <p style={{ margin: 0, fontSize: "0.7rem", color: "#22c55e" }}>
                      ● Online • Ready to help
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={clearChat}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "none",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                    }}
                  >
                    🗑 Clear
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAIChat(false)}
                    style={{
                      background: "rgba(239,68,68,0.2)",
                      border: "none",
                      color: "#ef4444",
                      padding: "5px 10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                    }}
                  >
                    ✕ Close
                  </motion.button>
                </div>
              </div>

              {/* Chat Messages */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                      display: "flex",
                      justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "80%",
                        padding: "12px 15px",
                        borderRadius: msg.sender === "user" ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
                        background: msg.sender === "user" 
                          ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                          : "rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                    >
                      <p style={{ margin: 0, fontSize: "0.9rem", whiteSpace: "pre-wrap" }}>
                        {msg.text}
                      </p>
                      <p style={{ margin: "5px 0 0", fontSize: "0.6rem", opacity: 0.6 }}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <div
                      style={{
                        padding: "12px 15px",
                        borderRadius: "20px",
                        background: "rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                    >
                      <div style={{ display: "flex", gap: "5px" }}>
                        <span>●</span>
                        <span>●</span>
                        <span>●</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <div
                style={{
                  padding: "20px",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about fake news detection... 💬"
                  rows="2"
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "15px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    color: "white",
                    resize: "none",
                    fontFamily: "inherit",
                    outline: "none",
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "15px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Send 📤
                </motion.button>
              </div>

              {/* Quick Questions */}
              <div
                style={{
                  padding: "10px 20px 20px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {[
                  "How to detect fake news?",
                  "Supported languages?",
                  "How accurate is AI?",
                  "Is it free?"
                ].map((question) => (
                  <motion.button
                    key={question}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setInputMessage(question);
                      setTimeout(() => sendMessage(), 100);
                    }}
                    style={{
                      background: "rgba(59,130,246,0.2)",
                      border: "1px solid rgba(59,130,246,0.3)",
                      color: "#60a5fa",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                    }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;