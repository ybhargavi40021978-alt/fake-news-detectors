import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    handleResize();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Button click handlers - All Functional
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log("Home clicked");
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
    console.log("Redirecting to Login Page...");
  };

  const handleRegisterClick = () => {
    window.location.href = "/register";
    console.log("Redirecting to Registration Page...");
  };

  const handleFeatureClick = (feature) => {
    alert(`✨ ${feature} feature is coming soon! Stay tuned.`);
    console.log(`${feature} clicked`);
  };

  const gradientX = windowSize.width ? (mousePosition.x / windowSize.width) * 100 : 50;
  const gradientY = windowSize.height ? (mousePosition.y / windowSize.height) * 100 : 50;

  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 3 + Math.random() * 5,
    delay: Math.random() * 5,
  }));

  return (
    <>
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          ::-webkit-scrollbar {
            display: none;
          }
          
          /* Hide scrollbar for IE, Edge and Firefox */
          * {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          /* 3D Animation Effects */
          @keyframes float3d {
            0%, 100% {
              transform: translateY(0px) rotateX(0deg) rotateY(0deg);
            }
            25% {
              transform: translateY(-20px) rotateX(8deg) rotateY(5deg);
            }
            75% {
              transform: translateY(20px) rotateX(-5deg) rotateY(-6deg);
            }
          }

          @keyframes glowPulse {
            0%, 100% {
              box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
              border-color: rgba(59, 130, 246, 0.3);
            }
            50% {
              box-shadow: 0 0 60px rgba(59, 130, 246, 1);
              border-color: rgba(59, 130, 246, 1);
            }
          }

          @keyframes backgroundShift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes shine {
            0% {
              left: -100%;
            }
            100% {
              left: 200%;
            }
          }

          .float-3d {
            animation: float3d 6s ease-in-out infinite;
          }

          .glow-pulse {
            animation: glowPulse 3s ease-in-out infinite;
          }

          .animate-bg {
            background-size: 200% 200%;
            animation: backgroundShift 10s ease infinite;
          }

          /* Smooth transitions */
          * {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* 3D Card Effect */
          .card-3d {
            transform-style: preserve-3d;
            transition: transform 0.5s ease;
          }

          .card-3d:hover {
            transform: translateY(-15px) rotateX(8deg) scale(1.02);
          }

          /* Button Styles */
          .btn-3d {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .btn-3d:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 15px 40px rgba(59, 130, 246, 0.5);
          }

          .btn-3d:active {
            transform: translateY(0);
          }

          /* Shine Effect */
          .btn-shine::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s ease;
          }

          .btn-shine:hover::before {
            left: 100%;
          }

          /* Logo Animation */
          .logo-3d {
            transform-style: preserve-3d;
            animation: float3d 4s ease-in-out infinite;
          }

          /* Text Gradient Animation */
          .text-gradient-animate {
            background: linear-gradient(270deg, #ffffff, #3b82f6, #8b5cf6, #ec4899, #ffffff);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: backgroundShift 5s ease infinite;
          }

          /* Particle Animation */
          .particle-glow {
            animation: glowPulse 2s ease-in-out infinite;
          }

          /* Center Everything */
          .center-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            min-height: 100vh;
          }
        `}
      </style>

      {/* HERO SECTION - Perfectly Centered */}
      <section ref={targetRef} className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4 md:px-6 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              rotate: [360, 180, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl"
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full particle-glow"
              initial={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
              }}
              animate={{
                y: [null, -40, 40, -40],
                x: [null, 20, -20, 20],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
              style={{
                left: particle.left,
                top: particle.top,
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center"
        >
          {/* Logo - Centered */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotateY: -180, rotateX: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0, rotateX: 0 }}
            transition={{ delay: 0.2, type: "spring", duration: 1.2, bounce: 0.5 }}
            className="mb-6"
          >
            <div className="relative logo-3d inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl glow-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full p-5 border-2 border-white/20 hover:border-blue-500/50 transition-all duration-500">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <span className="text-5xl font-bold text-white">🤖</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Title - Centered */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient-animate hover:scale-105 transition-transform duration-500 mb-3"
          >
            AI Truth Engine
            <span className="inline-block ml-2 hover:rotate-12 transition-transform duration-300">🛡️</span>
          </motion.h1>

          {/* Subtitle - Centered */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text mt-3 font-semibold"
          >
            Detect Fake News Before It Spreads 📰❌
          </motion.h2>

          {/* Description - Centered */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-sm md:text-base text-gray-300 mt-5 leading-relaxed max-w-2xl mx-auto"
          >
            🚀 AI-powered platform that analyzes news articles, headlines and online content 
            using Machine Learning and Natural Language Processing to identify misinformation.✨
          </motion.p>

          {/* Feature Cards - Centered Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8"
          >
            {[
              { text: "Real-time News Verification", emoji: "⚡", color: "from-blue-400 to-blue-600" },
              { text: "AI Confidence Score Analysis", emoji: "🧠", color: "from-purple-400 to-purple-600" },
              { text: "History Tracking & Analytics", emoji: "📊", color: "from-green-400 to-green-600" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFeatureClick(item.text)}
                className="card-3d flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl px-3 py-3 border border-white/10 cursor-pointer hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <span className="text-xl transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">{item.emoji}</span>
                <span className={`text-xs font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent group-hover:text-white transition-all duration-300`}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Buttons - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex justify-center gap-4 mt-8 mb-6 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleHomeClick}
              className="btn-3d btn-shine px-5 py-2 text-gray-300 hover:text-white font-semibold transition-all duration-300 text-sm bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 hover:border-blue-500/50 relative overflow-hidden flex items-center gap-2"
            >
              <span className="text-base">🏠</span>
              <span className="relative z-10">Home</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoginClick}
              className="btn-3d btn-shine px-5 py-2 text-gray-300 hover:text-white font-semibold transition-all duration-300 text-sm bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 hover:border-blue-500/50 relative overflow-hidden flex items-center gap-2"
            >
              <span className="text-base">🔐</span>
              <span className="relative z-10">Login</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRegisterClick}
              className="btn-3d btn-shine px-5 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg shadow-blue-500/25 text-sm cursor-pointer relative overflow-hidden flex items-center gap-2"
            >
              <span className="text-base">📝</span>
              <span className="relative z-10">Register</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(59,130,246,0.15) 0%, transparent 60%)`,
          }}
        />
      </section>

      {/* Footer - Perfectly Centered */}
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-t from-slate-950 to-slate-900 text-white border-t border-white/10 py-6"
      >
        {/* Footer Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -left-32 bottom-0 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -right-32 top-0 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center gap-2">
            {/* Small Logo - Centered */}
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
            >
              <span className="text-xl">🤖</span>
            </motion.div>
            
            {/* Copyright Text - Centered */}
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2 flex-wrap">
              <span>©</span> 2024 AI Truth Engine. All rights reserved. 
              <span>🛡️</span>
            </p>
          </div>
        </div>
      </motion.footer>
    </>
  );
}

export default Home;