import React from 'react';
import { motion } from 'framer-motion';

const SocialLogin = () => {
  const handleSocialLogin = (provider) => {
    alert(`${provider} login coming soon!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{
        marginTop: "20px",
        paddingTop: "15px",
        borderTop: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <p style={{ textAlign: "center", fontSize: "12px", color: "#999", marginBottom: "15px" }}>
        Or continue with
      </p>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={() => handleSocialLogin('Google')} style={{ padding: "10px 15px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", cursor: "pointer", color: "#fff" }}>🌐 Google</button>
        <button onClick={() => handleSocialLogin('Facebook')} style={{ padding: "10px 15px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", cursor: "pointer", color: "#fff" }}>📘 Facebook</button>
        <button onClick={() => handleSocialLogin('GitHub')} style={{ padding: "10px 15px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", cursor: "pointer", color: "#fff" }}>🐙 GitHub</button>
      </div>
    </motion.div>
  );
};

export default SocialLogin;