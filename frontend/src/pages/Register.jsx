import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [backendStatus, setBackendStatus] = useState(null);

  // Test backend connection on component mount
  useEffect(() => {
    const testBackend = async () => {
      try {
        const response = await fetch('https://fake-news-detectors-dkti.onrender.com');
        const data = await response.json();
        console.log('✅ Backend connected:', data);
        setBackendStatus('connected');
      } catch (error) {
        console.error('❌ Backend not reachable:', error);
        setBackendStatus('disconnected');
        setMessage('⚠️ Cannot connect to backend server');
      }
    };
    testBackend();
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (name && name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!email) newErrors.email = 'Email is required';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    if (password && password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password && confirmPassword && password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleRegister = async () => {
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setMessage('');

      try {
        console.log('📝 Sending registration request to:', 'https://fake-news-detectors-dkti.onrender.com/api/auth/register');
        console.log('📝 Data:', { name, email, password: '***' });
        
        const response = await fetch( 'https://fake-news-detectors-dkti.onrender.com/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ 
            name, 
            email, 
            password 
          })
        });
        
        const data = await response.json();
        console.log('✅ Response data:', data);
        
        if (data.success) {
          setMessage('✅ Registration successful! Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setMessage(data.message || '❌ Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('❌ Fetch error details:', error);
        
        if (error.message === 'Failed to fetch') {
  setMessage('❌ Cannot connect to backend server.');
} else {
          setMessage('❌ Registration failed: ' + error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Backend Status Indicator (for debugging) */}
      {backendStatus === 'disconnected' && (
        <div style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          background: "rgba(239,68,68,0.9)",
          color: "white",
          padding: "8px 15px",
          borderRadius: "20px",
          fontSize: "12px",
          zIndex: 1000
        }}>
          ⚠️ Backend Disconnected
        </div>
      )}
      {backendStatus === 'connected' && (
        <div style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          background: "rgba(34,197,94,0.9)",
          color: "white",
          padding: "8px 15px",
          borderRadius: "20px",
          fontSize: "12px",
          zIndex: 1000
        }}>
          ✅ Backend Connected
        </div>
      )}

      {/* Animated Background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
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
          rotate: [360, 180, 0],
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
          width: "450px",
          padding: "30px",
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
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
              boxShadow: "0 0 30px rgba(59,130,246,0.5)"
            }}
          >
            <span style={{ fontSize: "32px" }}>🤖</span>
          </div>
          <h2 style={{ 
            textAlign: "center", 
            background: "linear-gradient(135deg, #fff, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "24px",
            margin: "0"
          }}>
            Create Account
          </h2>
          <p style={{ color: "#999", fontSize: "14px", marginTop: "5px" }}>
            Join the fight against misinformation
          </p>
        </motion.div>

        {/* Name Field */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: "15px" }}
        >
          <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", color: "#ccc" }}>
            👤 Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            style={{
              width: "100%",
              padding: "12px",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${errors.name ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "12px",
              color: "#fff",
              fontSize: "14px",
              outline: "none"
            }}
          />
          {errors.name && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "5px" }}>{errors.name}</p>}
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: "15px" }}
        >
          <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", color: "#ccc" }}>
            📧 Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "12px",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${errors.email ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "12px",
              color: "#fff",
              fontSize: "14px",
              outline: "none"
            }}
          />
          {errors.email && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "5px" }}>{errors.email}</p>}
        </motion.div>

        {/* Password Field */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          style={{ marginBottom: "15px" }}
        >
          <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", color: "#ccc" }}>
            🔒 Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password (min 6 characters)"
            style={{
              width: "100%",
              padding: "12px",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${errors.password ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "12px",
              color: "#fff",
              fontSize: "14px",
              outline: "none"
            }}
          />
          {errors.password && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "5px" }}>{errors.password}</p>}
        </motion.div>

        {/* Confirm Password Field */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          style={{ marginBottom: "20px" }}
        >
          <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", color: "#ccc" }}>
            ✓ Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            style={{
              width: "100%",
              padding: "12px",
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${errors.confirmPassword ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "12px",
              color: "#fff",
              fontSize: "14px",
              outline: "none"
            }}
          />
          {errors.confirmPassword && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "5px" }}>{errors.confirmPassword}</p>}
        </motion.div>

        {/* Register Button */}
        <motion.button
          onClick={handleRegister}
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
            marginBottom: "15px"
          }}
        >
          {loading ? "⏳ Registering..." : "📝 Register"}
        </motion.button>

        {/* Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              color: message.includes("✅") ? "#4ade80" : (message.includes("⚠️") ? "#f59e0b" : "#f87171"),
              fontSize: "13px",
              marginBottom: "15px",
              padding: "8px",
              borderRadius: "8px",
              background: "rgba(0,0,0,0.3)"
            }}
          >
            {message}
          </motion.p>
        )}

        {/* Login Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ textAlign: "center", fontSize: "13px", color: "#ccc", marginBottom: "10px" }}
        >
          Already have an account?{" "}
          <motion.span
            onClick={handleLoginClick}
            whileHover={{ scale: 1.05 }}
            style={{
              cursor: "pointer",
              color: "#3b82f6",
              fontWeight: "bold",
              display: "inline-block"
            }}
          >
            🔐 Login Here
          </motion.span>
        </motion.p>

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
            marginTop: "10px"
          }}
        >
          🏠 Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Register;
