import React from 'react';
import { motion } from 'framer-motion';

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  rightIcon,
  onRightIconClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ marginBottom: "15px" }}
    >
      {label && (
        <label style={{
          display: "block",
          marginBottom: "8px",
          fontSize: "13px",
          fontWeight: "500",
          color: "#ccc"
        }}>
          {label}
        </label>
      )}
      
      <div style={{ position: "relative" }}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "12px 40px 12px 15px",
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${error ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "12px",
            color: "#fff",
            fontSize: "14px",
            transition: "all 0.3s",
            outline: "none"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = error ? "#ef4444" : "#3b82f6";
            e.target.style.background = "rgba(255,255,255,0.08)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? "#ef4444" : "rgba(255,255,255,0.1)";
            e.target.style.background = "rgba(255,255,255,0.05)";
          }}
        />
        
        {rightIcon && (
          <button
            onClick={onRightIconClick}
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
              padding: 0
            }}
          >
            {rightIcon}
          </button>
        )}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            color: "#ef4444",
            fontSize: "11px",
            marginTop: "5px",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}
        >
          <span>⚠️</span> {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default InputField;