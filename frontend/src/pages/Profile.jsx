import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);
  
  // Chat states
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI Assistant. Ask me anything about fact-checking, news verification, or how to use this platform! 🤖", sender: "ai", timestamp: new Date().toLocaleTimeString() }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [aiInsights, setAiInsights] = useState({
    message: "",
    tips: [],
    recommendation: "",
    trend: "",
    badge: "",
  });

  const [stats, setStats] = useState({
    total: 0,
    real: 0,
    fake: 0,
    accuracy: 0,
  });

  // 3D mouse effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  // AI Response Generator
  const getAIResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes("fake news") || lowerMsg.includes("detect") || lowerMsg.includes("identify")) {
      return "To detect fake news, look for these signs: 🔍\n• Check the source domain (is it legitimate?)\n• Look for emotional language or sensational headlines\n• Verify with multiple trusted news outlets\n• Check publication date (old news can resurface)\n• Use our AI analyzer - paste any news and get instant verification with 85-99% accuracy!";
    }
    else if (lowerMsg.includes("accuracy") || lowerMsg.includes("trust") || lowerMsg.includes("reliable")) {
      return `Our AI model has ${stats.accuracy}% accuracy based on your ${stats.total} analyses. We use advanced machine learning, cross-referencing with trusted sources, and linguistic analysis to ensure reliable results. The more you use it, the smarter it gets! 🎯`;
    }
    else if (lowerMsg.includes("language") || lowerMsg.includes("translate")) {
      return "We support 13+ languages including English, Hindi, Tamil, Telugu, Malayalam, Kannada, Bengali, Spanish, French, German, Chinese, Japanese, and Arabic. Just select your preferred language from the dropdown in the Analyze section! 🌐";
    }
    else if (lowerMsg.includes("history") || lowerMsg.includes("save") || lowerMsg.includes("previous")) {
      return "All your analysis results are automatically saved in History. You can view past analyses, track patterns, and clear history anytime. Click on 'History' in the navigation menu to see your complete verification journey! 📜";
    }
    else if (lowerMsg.includes("how to use") || lowerMsg.includes("guide") || lowerMsg.includes("tutorial")) {
      return "Simple 3-step process: 📝\n1️⃣ Select your preferred language\n2️⃣ Paste or type the news content\n3️⃣ Click 'Analyze' and get instant results with confidence score and detailed reasoning.\n\nPro tip: Try the 'Example' button to see how it works!";
    }
    else if (lowerMsg.includes("visualization") || lowerMsg.includes("chart") || lowerMsg.includes("graph") || lowerMsg.includes("data")) {
      return "Check out your Data Visualization section! Click the '📊 View Data Visualization' button to see beautiful charts showing your fact-checking patterns, accuracy trends, and category breakdowns. It's a great way to track your progress! 📈";
    }
    else if (lowerMsg.includes("profile") || lowerMsg.includes("account")) {
      return "Your profile stores your personal information and tracks all your fact-checking statistics. You can edit your details anytime. The AI Insights section gives you personalized tips based on your verification patterns! 👤";
    }
    else if (lowerMsg.includes("badge") || lowerMsg.includes("level")) {
      return `You currently have "${aiInsights.badge}" badge! 🏆\n• Master Fact-Checker: 90%+ accuracy\n• Skilled Verifier: 70-89% accuracy\n• Growing Analyst: 50-69% accuracy\n• Critical Thinker: <50% accuracy\nKeep analyzing to level up!`;
    }
    else if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey") || lowerMsg.includes("namaste")) {
      return "Hello! 👋 Welcome to AI Truth Engine. I'm here to help you with fake news detection, platform features, and fact-checking tips. What would you like to know today?";
    }
    else if (lowerMsg.includes("thank")) {
      return "You're very welcome! 😊 I'm glad I could help. Remember, fact-checking is a skill that improves with practice. Keep using our platform to become a verification expert! 🚀";
    }
    else if (lowerMsg.includes("tip") || lowerMsg.includes("advice")) {
      return "Here's a pro tip for better fact-checking: 💡\nAlways check multiple sources before believing a claim. If something seems too sensational or emotionally charged, verify it first. Our AI analyzer can help you make informed decisions!";
    }
    else {
      return "Thanks for your question! 🤔 Here's what I can help you with:\n\n📰 How to detect fake news\n🎯 Our AI accuracy levels\n🌐 Supported languages\n📜 Viewing analysis history\n📊 Data visualization\n👤 Profile management\n🏆 Badges and levels\n💡 Pro fact-checking tips\n\nJust ask me anything! 💬";
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    
    setIsTyping(true);
    
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
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      { id: 1, text: "Hello! I'm your AI Assistant. Ask me anything about fact-checking, news verification, or how to use this platform! 🤖", sender: "ai", timestamp: new Date().toLocaleTimeString() }
    ]);
  };

  // Generate AI Insights based on user's analysis
  const generateAIInsights = (total, real, fake, accuracy) => {
    if (total === 0) {
      return {
        message: "🌟 Start your fact-checking journey! Your first analysis will help AI learn your preferences.",
        tips: [
          "📰 Try analyzing a news article from a trusted source",
          "🔍 Use the example button to see how analysis works",
          "🌐 Test different languages to explore multilingual support",
          "📊 Click 'View Data Visualization' to see your stats in charts"
        ],
        recommendation: "Analyze 3 news articles to receive detailed AI insights about your fact-checking patterns!",
        trend: "🚀 Getting Started",
        badge: "🌱 Beginner Fact-Checker",
      };
    }

    let message = "";
    let badge = "";
    let trend = "";
    
    if (accuracy >= 90) {
      message = "🎉 Outstanding! You're an expert fact-checker. Your high accuracy shows excellent judgment in identifying credible news sources!";
      badge = "🏆 Master Fact-Checker";
      trend = "📈 Exceptional Performance ↑";
    } else if (accuracy >= 70) {
      message = "👍 Good progress! You're developing strong fact-checking skills. Keep practicing to become even more accurate!";
      badge = "⭐ Skilled Verifier";
      trend = "📊 Steady Improvement →";
    } else if (accuracy >= 50) {
      message = "📚 Learning phase detected! You're building your fact-checking muscles. Try cross-referencing multiple sources for better accuracy.";
      badge = "🌿 Growing Analyst";
      trend = "🔄 Mixed Results ↔";
    } else {
      message = "🤔 Interesting pattern! You're encountering many misleading news items. Consider checking source credibility and looking for verified markers.";
      badge = "⚠️ Critical Thinker in Training";
      trend = "📉 Need Calibration ↓";
    }
    
    const fakePercentage = (fake / total) * 100;
    let tips = [];
    if (fakePercentage > 50) {
      tips = [
        "🔍 Check the source's domain - is it legitimate?",
        "📅 Verify publication date - old news can resurface as fake",
        "🌐 Cross-reference with other reliable news outlets",
        "📸 Reverse image search suspicious photos",
        "⚠️ Watch for emotional manipulation in headlines"
      ];
    } else if (fakePercentage > 20) {
      tips = [
        "✅ You're doing well! Focus on verifying unusual claims",
        "📚 Read beyond headlines - context matters",
        "🔗 Check if citations and links work properly",
        "👤 Verify author credentials",
        "📊 Look for statistical consistency"
      ];
    } else {
      tips = [
        "🌟 Excellent! You have great news judgment",
        "🎯 Share fact-checking tips with friends and family",
        "📖 Explore different news categories to broaden perspective",
        "🤝 Join community discussions about media literacy",
        "🏆 You're close to becoming a verification expert!"
      ];
    }
    
    let recommendation = "";
    if (accuracy < 70) {
      recommendation = `Based on your analysis of ${total} articles, we recommend focusing on verifying suspicious claims. Try our multilingual feature to expand your fact-checking reach!`;
    } else if (total < 10) {
      recommendation = `Great start! Analyze ${10 - total} more articles to unlock advanced AI insights about your verification patterns.`;
    } else {
      recommendation = `Excellent work! You've analyzed ${total} articles with ${accuracy}% accuracy. Consider becoming a community fact-checker and sharing your expertise!`;
    }
    
    return { message, tips, recommendation, trend, badge };
  };

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    
    if (savedProfile && savedProfile.name && savedProfile.email) {
      setProfile(savedProfile);
      setIsProfileSaved(true);
    } else {
      setIsProfileSaved(false);
      setProfile({ name: "", email: "", phone: "" });
    }

    const history = JSON.parse(localStorage.getItem("analysisHistory")) || [];
    const real = history.filter((item) => item.result === "REAL").length;
    const fake = history.filter((item) => item.result === "FAKE").length;
    const total = history.length;
    const accuracy = total > 0 ? Math.round((real / total) * 100) : 0;

    setStats({ total, real, fake, accuracy });
    
    const insights = generateAIInsights(total, real, fake, accuracy);
    setAiInsights(insights);
    setIsLoading(false);
  }, []);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 50) return "Name must be less than 50 characters";
    if (!/^[a-zA-Z\s\-']+$/.test(name)) return "Name can only contain letters, spaces, hyphens, and apostrophes";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    if (email.length > 100) return "Email must be less than 100 characters";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "";
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(phone)) return "Please enter a valid phone number";
    if (phone.length < 10) return "Phone number must be at least 10 digits";
    if (phone.length > 15) return "Phone number must be less than 15 digits";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });

    let error = "";
    if (name === "name") error = validateName(value);
    if (name === "email") error = validateEmail(value);
    if (name === "phone") error = validatePhone(value);

    setErrors({ ...errors, [name]: error });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSave = () => {
    const nameError = validateName(profile.name);
    const emailError = validateEmail(profile.email);
    const phoneError = validatePhone(profile.phone);

    const newErrors = { name: nameError, email: emailError, phone: phoneError };
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true });

    if (nameError || emailError || phoneError) {
      setMessageType("error");
      setMessage("❌ Please fix the errors before saving");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(profile));
    setIsProfileSaved(true);
    setMessageType("success");
    setMessage("✅ Profile Saved Successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = () => {
    setIsProfileSaved(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("rememberUser");
    localStorage.removeItem("userProfile");
    navigate("/login");
  };

  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return "";
    if (errors[fieldName]) return "error";
    if (profile[fieldName]) return "success";
    return "";
  };

  const getFieldIcon = (fieldName) => {
    const status = getFieldStatus(fieldName);
    if (status === "success") return "✅";
    if (status === "error") return "❌";
    return "";
  };

  // Visualization Component
  const VisualizationModal = () => (
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
        background: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={() => setShowVisualization(false)}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        style={{
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          borderRadius: "25px",
          maxWidth: "900px",
          width: "100%",
          maxHeight: "85vh",
          overflow: "auto",
          border: "1px solid rgba(255,255,255,0.2)",
          padding: "30px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
          <h2 style={{ margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
            📊 Your Data Visualization
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowVisualization(false)}
            style={{
              background: "rgba(239,68,68,0.2)",
              border: "none",
              color: "#ef4444",
              padding: "8px 15px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            ✕ Close
          </motion.button>
        </div>

        {stats.total === 0 ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <span style={{ fontSize: "4rem" }}>📭</span>
            <h3>No Data Available Yet</h3>
            <p>Start analyzing news to see your visualization!</p>
          </div>
        ) : (
          <>
            {/* Donut Chart - Real vs Fake */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Real vs Fake News Distribution</h3>
              <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
                <div style={{ position: "relative", width: "200px", height: "200px" }}>
                  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#22c55e" strokeWidth="10" 
                      strokeDasharray={`${(stats.real / stats.total) * 283} 283`} />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#ef4444" strokeWidth="10"
                      strokeDasharray={`${(stats.fake / stats.total) * 283} 283`}
                      strokeDashoffset={`-${(stats.real / stats.total) * 283}`} />
                  </svg>
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{stats.total}</div>
                    <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Total</div>
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <div style={{ width: "20px", height: "20px", background: "#22c55e", borderRadius: "50%" }}></div>
                    <span>Real News: {stats.real} ({Math.round((stats.real/stats.total)*100)}%)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "20px", height: "20px", background: "#ef4444", borderRadius: "50%" }}></div>
                    <span>Fake News: {stats.fake} ({Math.round((stats.fake/stats.total)*100)}%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accuracy Gauge */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Accuracy Score</h3>
              <div style={{ position: "relative", width: "200px", height: "100px", margin: "0 auto", overflow: "hidden" }}>
                <svg viewBox="0 0 100 50" style={{ width: "100%", height: "100%" }}>
                  <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#334155" strokeWidth="8" />
                  <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke={stats.accuracy >= 80 ? "#22c55e" : stats.accuracy >= 60 ? "#f59e0b" : "#ef4444"} 
                    strokeWidth="8" strokeDasharray={`${(stats.accuracy / 100) * 251} 251`} />
                </svg>
                <div style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: stats.accuracy >= 80 ? "#22c55e" : stats.accuracy >= 60 ? "#f59e0b" : "#ef4444" }}>
                    {stats.accuracy}%
                  </div>
                </div>
              </div>
            </div>

            {/* Bar Chart - Performance Meter */}
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Performance Meter</h3>
              <div style={{ background: "#334155", borderRadius: "10px", height: "30px", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.accuracy}%` }}
                  transition={{ duration: 1 }}
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}
                >
                  {stats.accuracy}%
                </motion.div>
              </div>
            </div>

            {/* Badge Display */}
            <div style={{ textAlign: "center", marginTop: "20px", padding: "15px", background: "rgba(139,92,246,0.1)", borderRadius: "15px" }}>
              <span style={{ fontSize: "2rem" }}>🏆</span>
              <h4>{aiInsights.badge}</h4>
              <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{aiInsights.trend}</p>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} style={{ fontSize: "3rem" }}>🤖</motion.div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
        color: "white",
        padding: "40px",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.width / 2);
        mouseY.set(e.clientY - rect.height / 2);
      }}
    >
      {/* Background Glows */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, 150, 0], y: [0, -100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "rgba(59,130,246,0.3)", filter: "blur(120px)",
          top: "-200px", left: "-200px",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -120, 0], y: [0, 80, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "450px", height: "450px", borderRadius: "50%",
          background: "rgba(139,92,246,0.3)", filter: "blur(120px)",
          bottom: "-150px", right: "-150px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}
      >
        {/* Header */}
        <motion.div style={{ perspective: "1000px", rotateX: rotateX, rotateY: rotateY }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              style={{
                width: "140px", height: "140px", margin: "0 auto", borderRadius: "50%",
                background: isProfileSaved ? "linear-gradient(135deg, #22c55e, #3b82f6, #8b5cf6)" : "linear-gradient(135deg, #64748b, #475569)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "65px",
                boxShadow: isProfileSaved ? "0 0 50px rgba(34,197,94,0.5)" : "0 0 30px rgba(100,116,139,0.3)",
                cursor: "pointer",
              }}
            >
              {isProfileSaved && profile.name ? profile.name.charAt(0).toUpperCase() : "👤"}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                marginTop: "20px",
                fontSize: "2.5rem",
                background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {isProfileSaved ? `Welcome, ${profile.name.split(" ")[0]}!` : "Complete Your Profile"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ color: "#94a3b8" }}
            >
              {isProfileSaved ? "Manage your account and get AI-powered insights" : "Please complete your profile to get started"}
            </motion.p>
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            style={{
              background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: "25px", padding: "30px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "25px" }}>
              <span style={{ fontSize: "1.8rem" }}>{isProfileSaved ? "✏️" : "📝"}</span>
              <h2 style={{ margin: 0 }}>{isProfileSaved ? "Edit Profile" : "Create Profile"}</h2>
              {isProfileSaved && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ background: "#22c55e", padding: "2px 10px", borderRadius: "20px", fontSize: "0.7rem", marginLeft: "10px" }}
                >
                  Saved ✓
                </motion.span>
              )}
            </div>

            {!isProfileSaved ? (
              <>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", color: "#cbd5e1" }}>👤 Full Name <span style={{ color: "#ef4444" }}>*</span></label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text" name="name" value={profile.name} onChange={handleChange} onBlur={handleBlur}
                      placeholder="Enter your full name" autoFocus
                      style={{ ...inputStyle, borderColor: getFieldStatus("name") === "error" ? "#ef4444" : getFieldStatus("name") === "success" ? "#22c55e" : "rgba(255,255,255,0.1)" }}
                    />
                    <span style={{ position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)" }}>{getFieldIcon("name")}</span>
                  </div>
                  {touched.name && errors.name && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "5px" }}>
                      {errors.name}
                    </motion.p>
                  )}
                </div>
                <div style={{ marginTop: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#cbd5e1" }}>📧 Email Address <span style={{ color: "#ef4444" }}>*</span></label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="email" name="email" value={profile.email} onChange={handleChange} onBlur={handleBlur}
                      placeholder="your@email.com"
                      style={{ ...inputStyle, borderColor: getFieldStatus("email") === "error" ? "#ef4444" : getFieldStatus("email") === "success" ? "#22c55e" : "rgba(255,255,255,0.1)" }}
                    />
                    <span style={{ position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)" }}>{getFieldIcon("email")}</span>
                  </div>
                  {touched.email && errors.email && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "5px" }}>
                      {errors.email}
                    </motion.p>
                  )}
                </div>
                <div style={{ marginTop: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#cbd5e1" }}>📞 Phone Number (Optional)</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="tel" name="phone" value={profile.phone} onChange={handleChange} onBlur={handleBlur}
                      placeholder="+91 12345 67890"
                      style={{ ...inputStyle, borderColor: getFieldStatus("phone") === "error" ? "#ef4444" : getFieldStatus("phone") === "success" ? "#22c55e" : "rgba(255,255,255,0.1)" }}
                    />
                    <span style={{ position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)" }}>{getFieldIcon("phone")}</span>
                  </div>
                  {touched.phone && errors.phone && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "5px" }}>
                      {errors.phone}
                    </motion.p>
                  )}
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} style={saveButton}>
                  ✨ Create & Save Profile
                </motion.button>
              </>
            ) : (
              <>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", color: "#cbd5e1" }}>👤 Full Name</label>
                  <div style={{ padding: "12px 15px", background: "rgba(255,255,255,0.08)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {profile.name}
                  </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#cbd5e1" }}>📧 Email Address</label>
                  <div style={{ padding: "12px 15px", background: "rgba(255,255,255,0.08)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {profile.email}
                  </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#cbd5e1" }}>📞 Phone Number</label>
                  <div style={{ padding: "12px 15px", background: "rgba(255,255,255,0.08)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", color: profile.phone || "#64748b" }}>
                    {profile.phone || "Not provided"}
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleEdit} style={{ ...saveButton, background: "linear-gradient(135deg, #f59e0b, #ea580c)" }}>
                  ✏️ Edit Profile
                </motion.button>
              </>
            )}
            {message && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: "15px", color: messageType === "success" ? "#22c55e" : "#ef4444", textAlign: "center" }}>
                {message}
              </motion.p>
            )}
          </motion.div>

          {/* AI Insights & Actions Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
              {[
                { icon: "📊", title: "Total Analysis", value: stats.total, color: "#3b82f6" },
                { icon: "✅", title: "Real News", value: stats.real, color: "#22c55e" },
                { icon: "❌", title: "Fake News", value: stats.fake, color: "#ef4444" },
                { icon: "🎯", title: "Accuracy Rate", value: `${stats.accuracy}%`, color: "#f59e0b" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", borderRadius: "20px", padding: "20px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div style={{ fontSize: "2rem" }}>{stat.icon}</div>
                  <h3 style={{ fontSize: "0.9rem", color: "#cbd5e1", marginTop: "10px" }}>{stat.title}</h3>
                  <h2 style={{ color: stat.color, fontSize: "1.8rem", margin: "5px 0 0" }}>{stat.value}</h2>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAIChat(true)}
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                  border: "none", color: "white", padding: "15px", borderRadius: "15px",
                  cursor: "pointer", fontWeight: "bold", fontSize: "1rem",
                }}
              >
                🤖 Ask AI Assistant
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVisualization(true)}
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  border: "none", color: "white", padding: "15px", borderRadius: "15px",
                  cursor: "pointer", fontWeight: "bold", fontSize: "1rem",
                }}
              >
                📊 View Data Visualization
              </motion.button>
            </div>

            {/* AI Insights Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
                backdropFilter: "blur(20px)", borderRadius: "20px", padding: "25px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: "1.8rem" }}>🤖</motion.span>
                <h3 style={{ margin: 0 }}>AI-Powered Insights</h3>
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ background: "#8b5cf6", padding: "2px 8px", borderRadius: "20px", fontSize: "0.6rem", marginLeft: "10px" }}>LIVE</motion.span>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} style={{ background: "rgba(139,92,246,0.2)", borderRadius: "15px", padding: "10px", textAlign: "center", marginBottom: "20px", border: "1px solid rgba(139,92,246,0.3)" }}>
                <span style={{ fontSize: "0.8rem", color: "#a78bfa" }}>🏅 VERIFIER BADGE</span>
                <p style={{ margin: "5px 0 0", fontWeight: "bold", color: "#c4b5fd" }}>{aiInsights.badge}</p>
              </motion.div>

              <div style={{ marginBottom: "20px" }}>
                <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>📈 TREND ANALYSIS</span>
                <p style={{ margin: "5px 0 0", fontSize: "1rem" }}>{aiInsights.trend}</p>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ background: "rgba(0,0,0,0.3)", borderRadius: "15px", padding: "15px", marginBottom: "20px" }}>
                <p style={{ margin: 0, lineHeight: "1.6", color: "#e2e8f0" }}>{aiInsights.message}</p>
              </motion.div>

              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: "5px" }}>💡 AI-Generated Tips</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#94a3b8" }}>
                  {aiInsights.tips.slice(0, 3).map((tip, index) => (
                    <motion.li key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + (index * 0.1) }} style={{ marginBottom: "8px" }}>
                      {tip}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "15px", marginTop: "5px" }}>
                <h4 style={{ margin: "0 0 8px 0", display: "flex", alignItems: "center", gap: "5px" }}>🎯 AI Recommendation</h4>
                <p style={{ margin: 0, color: "#60a5fa", fontSize: "0.9rem", fontStyle: "italic" }}>"{aiInsights.recommendation}"</p>
              </div>

              {stats.total > 0 && (
                <div style={{ marginTop: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontSize: "0.7rem", color: "#94a3b8" }}>
                    <span>Fact-Checking Proficiency</span>
                    <span>{stats.accuracy}%</span>
                  </div>
                  <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "10px", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.accuracy}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      style={{ height: "100%", background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", borderRadius: "10px" }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "40px", flexWrap: "wrap" }}
        >
          <motion.button whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} style={dashboardButton} onClick={() => navigate("/dashboard")}>
            🏠 Back to Dashboard
          </motion.button>
          <motion.button whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} style={logoutButton} onClick={handleLogout}>
            🚪 Logout Account
          </motion.button>
        </motion.div>
      </motion.div>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)", zIndex: 1000,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onClick={() => setShowAIChat(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              style={{
                background: "linear-gradient(135deg, #1e293b, #0f172a)", borderRadius: "25px",
                width: "90%", maxWidth: "550px", height: "85vh", maxHeight: "700px",
                display: "flex", flexDirection: "column", border: "1px solid rgba(255,255,255,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(59,130,246,0.1)", borderRadius: "25px 25px 0 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "45px", height: "45px", background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>🤖</div>
                  <div>
                    <h3 style={{ margin: 0, color: "white" }}>AI Assistant</h3>
                    <p style={{ margin: 0, fontSize: "0.7rem", color: "#22c55e" }}>● Online • Ask me anything</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={clearChat}
                    style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "5px 10px", borderRadius: "10px", cursor: "pointer", fontSize: "0.8rem" }}>
                    🗑 Clear
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowAIChat(false)}
                    style={{ background: "rgba(239,68,68,0.2)", border: "none", color: "#ef4444", padding: "5px 10px", borderRadius: "10px", cursor: "pointer", fontSize: "0.8rem" }}>
                    ✕ Close
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
                {messages.map((msg) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }} animate={{ opacity: 1, x: 0 }}
                    style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{
                      maxWidth: "80%", padding: "12px 15px",
                      borderRadius: msg.sender === "user" ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
                      background: msg.sender === "user" ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" : "rgba(255,255,255,0.1)",
                      color: "white"
                    }}>
                      <p style={{ margin: 0, fontSize: "0.9rem", whiteSpace: "pre-wrap" }}>{msg.text}</p>
                      <p style={{ margin: "5px 0 0", fontSize: "0.6rem", opacity: 0.6 }}>{msg.timestamp}</p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ padding: "12px 15px", borderRadius: "20px", background: "rgba(255,255,255,0.1)", color: "white" }}>
                      <div style={{ display: "flex", gap: "5px" }}><span>●</span><span>●</span><span>●</span></div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: "10px" }}>
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about fake news detection... 💬"
                  rows="2"
                  style={{
                    flex: 1, padding: "10px", borderRadius: "15px",
                    border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)",
                    color: "white", resize: "none", fontFamily: "inherit", outline: "none"
                  }}
                />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={sendMessage}
                  style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", border: "none", color: "white", padding: "10px 20px", borderRadius: "15px", cursor: "pointer", fontWeight: "bold" }}>
                  Send 📤
                </motion.button>
              </div>

              {/* Quick Questions */}
              <div style={{ padding: "10px 20px 20px", display: "flex", gap: "10px", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {["How to detect fake news?", "What's my accuracy?", "Supported languages?", "View my data?"].map((question) => (
                  <motion.button
                    key={question}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setInputMessage(question); setTimeout(() => sendMessage(), 100); }}
                    style={{ background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.3)", color: "#60a5fa", padding: "5px 12px", borderRadius: "20px", cursor: "pointer", fontSize: "0.75rem" }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visualization Modal */}
      <AnimatePresence>
        {showVisualization && <VisualizationModal />}
      </AnimatePresence>
    </div>
  );
};

const inputStyle = {
  width: "100%", padding: "12px 40px 12px 15px", borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)",
  color: "white", outline: "none", boxSizing: "border-box", fontSize: "0.95rem", transition: "all 0.3s ease",
};

const saveButton = {
  width: "100%", marginTop: "25px", background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
  border: "none", color: "white", padding: "14px", borderRadius: "12px",
  cursor: "pointer", fontWeight: "bold", fontSize: "1rem",
};

const dashboardButton = {
  background: "linear-gradient(135deg, #2563eb, #3b82f6)", border: "none",
  color: "white", padding: "12px 25px", borderRadius: "12px",
  cursor: "pointer", fontWeight: "bold", fontSize: "0.95rem",
};

const logoutButton = {
  background: "linear-gradient(135deg, #dc2626, #ef4444)", border: "none",
  color: "white", padding: "12px 25px", borderRadius: "12px",
  cursor: "pointer", fontWeight: "bold", fontSize: "0.95rem",
};

export default Profile;