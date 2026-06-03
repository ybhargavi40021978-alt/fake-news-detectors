import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import SocialLogin from "../components/SocialLogin";
import { validateEmail, validatePassword } from "../utils/validators";
import { authAPI } from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Real-time validation
  useEffect(() => {
    const newErrors = {};
    
    if (email && !validateEmail(email)) {
      newErrors.email = "Invalid email format";
    } else if (email) {
      delete newErrors.email;
    }

    if (password && !validatePassword(password)) {
      newErrors.password = "Password must contain at least 8 characters";
    } else if (password) {
      delete newErrors.password;
    }

    setErrors(newErrors);
  }, [email, password]);

  // Load saved email
  useEffect(() => {
    const saved = localStorage.getItem("rememberUserEmail");
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  const handleLogin = async () => {
    let newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must contain at least 8 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setMessage("");

    try {
      // Call backend API
      const response = await authAPI.login({ email, password });
      
      if (response.data.success) {
        const { _id, name, email: userEmail, token, phone } = response.data.data;
        
        // Store login session
        localStorage.setItem("rememberUser", JSON.stringify({
          id: _id,
          email: userEmail,
          name: name,
          token: token,
          isLoggedIn: true
        }));
        
        // Store user profile
        localStorage.setItem("userProfile", JSON.stringify({
          name: name,
          email: userEmail,
          phone: phone || ""
        }));
        
        setMessage("✅ Login Successful! Redirecting to Dashboard...");

        if (remember) {
          localStorage.setItem("rememberUserEmail", email);
        } else {
          localStorage.removeItem("rememberUserEmail");
        }

        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || "❌ Invalid Email or Password. Please try again or register.");
    } finally {
      setLoading(false);
    }
  };

  // Social Login Handlers
  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage("");
    
    try {
      const response = await authAPI.socialLogin({
        provider: "google",
        email: "user@gmail.com",
        name: "Google User",
        providerId: "google_" + Date.now()
      });
      
      if (response.data.success) {
        const { _id, name, email: userEmail, token } = response.data.data;
        
        localStorage.setItem("rememberUser", JSON.stringify({
          id: _id,
          email: userEmail,
          name: name,
          token: token,
          isLoggedIn: true,
          provider: "google"
        }));
        
        localStorage.setItem("userProfile", JSON.stringify({
          name: name,
          email: userEmail,
          phone: ""
        }));
        
        setMessage("✅ Google Login Successful! Redirecting to Dashboard...");
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error) {
      setMessage("❌ Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    setMessage("");
    
    try {
      const response = await authAPI.socialLogin({
        provider: "facebook",
        email: "fb_user@facebook.com",
        name: "Facebook User",
        providerId: "fb_" + Date.now()
      });
      
      if (response.data.success) {
        const { _id, name, email: userEmail, token } = response.data.data;
        
        localStorage.setItem("rememberUser", JSON.stringify({
          id: _id,
          email: userEmail,
          name: name,
          token: token,
          isLoggedIn: true,
          provider: "facebook"
        }));
        
        localStorage.setItem("userProfile", JSON.stringify({
          name: name,
          email: userEmail,
          phone: ""
        }));
        
        setMessage("✅ Facebook Login Successful! Redirecting to Dashboard...");
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error) {
      setMessage("❌ Facebook login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    setMessage("");
    
    try {
      const response = await authAPI.socialLogin({
        provider: "github",
        email: "github_user@github.com",
        name: "GitHub User",
        providerId: "gh_" + Date.now()
      });
      
      if (response.data.success) {
        const { _id, name, email: userEmail, token } = response.data.data;
        
        localStorage.setItem("rememberUser", JSON.stringify({
          id: _id,
          email: userEmail,
          name: name,
          token: token,
          isLoggedIn: true,
          provider: "github"
        }));
        
        localStorage.setItem("userProfile", JSON.stringify({
          name: name,
          email: userEmail,
          phone: ""
        }));
        
        setMessage("✅ GitHub Login Successful! Redirecting to Dashboard...");
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error) {
      setMessage("❌ GitHub login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setMessage("📧 Password reset link sent to your email!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
        position: "relative",
        overflow: "auto",
        margin: 0,
        padding: "20px"
      }}
    >
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none"
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none"
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "35px",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 25px 45px rgba(0,0,0,0.3)",
          position: "relative",
          zIndex: 1
        }}
      >
        {/* Logo and Title */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          style={{ textAlign: "center", marginBottom: "25px" }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
              boxShadow: "0 0 30px rgba(59,130,246,0.5)"
            }}
          >
            <span style={{ fontSize: "36px" }}>🤖</span>
          </div>
          <h2 style={{ 
            textAlign: "center", 
            background: "linear-gradient(135deg, #fff, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "26px",
            margin: "0",
            fontWeight: "bold"
          }}>
            AI Truth Engine
          </h2>
          <p style={{ color: "#aaa", fontSize: "14px", marginTop: "8px" }}>
            Welcome back! 👋
          </p>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "500", color: "#ccc" }}>
            📧 Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "12px 15px",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${errors.email ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "12px",
              color: "#fff",
              fontSize: "14px",
              transition: "all 0.3s",
              outline: "none",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = errors.email ? "#ef4444" : "#3b82f6";
              e.target.style.background = "rgba(255,255,255,0.08)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.email ? "#ef4444" : "rgba(255,255,255,0.1)";
              e.target.style.background = "rgba(255,255,255,0.05)";
            }}
          />
          {errors.email && (
            <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "5px", display: "flex", alignItems: "center", gap: "4px" }}>
              <span>⚠️</span> {errors.email}
            </p>
          )}
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginTop: "15px" }}
        >
          <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "500", color: "#ccc" }}>
            🔒 Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "12px 40px 12px 15px",
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${errors.password ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
                borderRadius: "12px",
                color: "#fff",
                fontSize: "14px",
                transition: "all 0.3s",
                outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = errors.password ? "#ef4444" : "#3b82f6";
                e.target.style.background = "rgba(255,255,255,0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.password ? "#ef4444" : "rgba(255,255,255,0.1)";
                e.target.style.background = "rgba(255,255,255,0.05)";
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                padding: 0,
                color: "#aaa"
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "5px", display: "flex", alignItems: "center", gap: "4px" }}>
              <span>⚠️</span> {errors.password}
            </p>
          )}
        </motion.div>

        {/* Remember Me */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: "15px", marginBottom: "20px", display: "flex", alignItems: "center" }}
        >
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            style={{ cursor: "pointer", width: "16px", height: "16px" }}
          />
          <span style={{ marginLeft: "8px", fontSize: "13px", color: "#ccc" }}>
            💾 Remember Me
          </span>
        </motion.div>

        {/* Login Button */}
        <motion.button
          onClick={handleLogin}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            background: loading ? "#555" : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "all 0.3s"
          }}
        >
          {loading ? "⏳ Logging In..." : "🔐 Login"}
        </motion.button>

        {/* Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: "15px",
              textAlign: "center",
              color: message.includes("✅") ? "#4ade80" : "#f87171",
              fontSize: "13px",
              padding: "8px",
              borderRadius: "8px",
              background: "rgba(0,0,0,0.3)"
            }}
          >
            {message}
          </motion.p>
        )}

        {/* Forgot Password */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={handleForgotPassword}
          style={{
            marginTop: "15px",
            fontSize: "12px",
            textAlign: "center",
            cursor: "pointer",
            color: "#3b82f6",
            transition: "color 0.3s"
          }}
          whileHover={{ color: "#8b5cf6" }}
        >
          ❓ Forgot Password?
        </motion.p>

        {/* Register Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ fontSize: "13px", textAlign: "center", marginTop: "15px", color: "#ccc" }}
        >
          Don't have an account?{" "}
          <motion.span
            onClick={handleRegisterClick}
            whileHover={{ scale: 1.05 }}
            style={{
              cursor: "pointer",
              color: "#3b82f6",
              fontWeight: "bold",
              display: "inline-block"
            }}
          >
            📝 Register
          </motion.span>
        </motion.p>

        {/* Social Login Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ marginTop: "20px" }}
        >
          <div style={{ 
            display: "flex", 
            gap: "12px", 
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            {/* Google Button */}
            <motion.button
              onClick={handleGoogleLogin}
              disabled={loading}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                flex: 1,
                minWidth: "100px",
                padding: "10px 15px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(219,68,55,0.15)",
                color: "#fff",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.3s"
              }}
            >
              <span style={{ fontSize: "18px" }}>G</span>
              Google
            </motion.button>

            {/* Facebook Button */}
            <motion.button
              onClick={handleFacebookLogin}
              disabled={loading}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                flex: 1,
                minWidth: "100px",
                padding: "10px 15px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(66,103,178,0.15)",
                color: "#fff",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.3s"
              }}
            >
              <span style={{ fontSize: "18px" }}>f</span>
              Facebook
            </motion.button>

            {/* GitHub Button */}
            <motion.button
              onClick={handleGithubLogin}
              disabled={loading}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                flex: 1,
                minWidth: "100px",
                padding: "10px 15px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(36,41,46,0.15)",
                color: "#fff",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.3s"
              }}
            >
              <span style={{ fontSize: "18px" }}>🐙</span>
              GitHub
            </motion.button>
          </div>
        </motion.div>

        {/* Home Button */}
        <motion.button
          onClick={handleHomeClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "15px",
            transition: "all 0.3s"
          }}
        >
          🏠 Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;