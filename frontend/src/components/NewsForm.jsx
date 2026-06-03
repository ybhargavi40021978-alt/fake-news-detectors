// NewsForm.jsx (Clean Version)
import React, { useState } from "react";
import { motion } from "framer-motion";
import { analysisAPI } from "../services/api";

const NewsForm = () => {
  const [news, setNews] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");

  const languages = [
    { code: "en", name: "🇬🇧 English", flag: "🇬🇧" },
    { code: "hi", name: "🇮🇳 Hindi", flag: "🇮🇳" },
    { code: "ta", name: "🏳 Tamil", flag: "🇮🇳" },
    { code: "te", name: "🏳 Telugu", flag: "🇮🇳" },
    { code: "ml", name: "🏳 Malayalam", flag: "🇮🇳" },
    { code: "kn", name: "🏳 Kannada", flag: "🇮🇳" },
    { code: "bn", name: "🏳 Bengali", flag: "🇮🇳" },
    { code: "es", name: "🇪🇸 Spanish", flag: "🇪🇸" },
    { code: "fr", name: "🇫🇷 French", flag: "🇫🇷" },
    { code: "de", name: "🇩🇪 German", flag: "🇩🇪" },
    { code: "zh", name: "🇨🇳 Chinese", flag: "🇨🇳" },
    { code: "ja", name: "🇯🇵 Japanese", flag: "🇯🇵" },
    { code: "ar", name: "🇸🇦 Arabic", flag: "🇸🇦" },
  ];

  const exampleNews = {
    en: "NASA confirms discovery of underground water reservoirs on Mars after analyzing satellite imagery collected over several years.",
    hi: "नासा ने कई वर्षों में एकत्र किए गए उपग्रह इमेजरी का विश्लेषण करने के बाद मंगल ग्रह पर भूमिगत जलाशयों की खोज की पुष्टि की है।",
    ta: "பல ஆண்டுகளாக சேகரிக்கப்பட்ட செயற்கைக்கோள் படங்களை ஆய்வு செய்த பிறகு, செவ்வாய் கிரகத்தில் நிலத்தடி நீர் நீர்த்தேக்கங்களை கண்டுபிடித்ததை நாசா உறுதிப்படுத்தியுள்ளது.",
    te: "అనేక సంవత్సరాలుగా సేకరించిన ఉపగ్రహ చిత్రాలను విశ్లేషించిన తర్వాత అంగారక గ్రహంపై భూగర్భ జల రిజర్వాయర్లను కనుగొన్నట్లు NASA నిర్ధారించింది.",
    ml: "വർഷങ്ങളോളം ശേഖരിച്ച ഉപഗ്രഹ ചിത്രങ്ങൾ വിശകലനം ചെയ്തതിന് ശേഷം ചൊവ്വയിൽ ഭൂഗർഭ ജലസംഭരണികൾ കണ്ടെത്തിയതായി നാസ സ്ഥിരീകരിക്കുന്നു.",
    kn: "ಹಲವಾರು ವರ್ಷಗಳಿಂದ ಸಂಗ್ರಹಿಸಿದ ಉಪಗ್ರಹ ಚಿತ್ರಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿದ ನಂತರ ಮಂಗಳ ಗ್ರಹದಲ್ಲಿ ಅಂತರ್ಜಲ ಜಲಾಶಯಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿರುವುದನ್ನು NASA ದೃಢಪಡಿಸಿದೆ.",
    bn: "বেশ কয়েক বছর ধরে সংগৃহীত স্যাটেলাইট ইমেজারি বিশ্লেষণ করার পরে মঙ্গল গ্রহে ভূগর্ভস্থ জলাধার আবিষ্কারের কথা নাসা নিশ্চিত করেছে।",
    es: "La NASA confirma el descubrimiento de reservas de agua subterránea en Marte después de analizar imágenes satelitales recopiladas durante varios años.",
    fr: "La NASA confirme la découverte de réservoirs d'eau souterrains sur Mars après avoir analysé des images satellite collectées sur plusieurs années.",
    de: "Die NASA bestätigt die Entdeckung unterirdischer Wasserreservoirs auf dem Mars nach der Analyse von Satellitenbildern, die über mehrere Jahre gesammelt wurden.",
    zh: "美国宇航局在分析了多年收集的卫星图像后，确认在火星上发现了地下水储备。",
    ja: "NASAは、数年かけて収集された衛星画像を分析した後、火星で地下の水貯留層を発見したことを確認しました。",
    ar: "ناسا تؤكد اكتشاف خزانات مياه جوفية على المريخ بعد تحليل صور الأقمار الصناعية التي تم جمعها على مدى عدة سنوات."
  };

  const handleExample = () => {
    setNews(exampleNews[selectedLang] || exampleNews.en);
  };

  const handleClear = () => {
    setNews("");
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!news.trim()) {
      alert("Please enter news content first.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await analysisAPI.analyzeNews({
        text: news,
        language: selectedLang
      });

      if (response.data.success) {
        const { result: analysisResult, confidence, reason } = response.data.data;
        
        const analysisResultData = {
          status: analysisResult === 'REAL' ? 'REAL NEWS' : 'FAKE NEWS',
          confidence: confidence,
          reason: reason,
          originalStatus: analysisResult,
        };

        setResult(analysisResultData);

        const history = JSON.parse(localStorage.getItem("analysisHistory")) || [];
        history.unshift({
          text: news,
          result: analysisResult,
          confidence: confidence,
          date: new Date().toLocaleString(),
          language: selectedLang,
        });
        localStorage.setItem("analysisHistory", JSON.stringify(history.slice(0, 20)));
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      console.error("Analysis error:", error);
      alert(error.response?.data?.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const buttonStyle = (color) => ({
    background: color,
    border: "none",
    color: "white",
    padding: "12px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
  });

  return (
    <div>
      {/* Language Selector */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
          padding: "15px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "15px",
          maxHeight: "150px",
          overflowY: "auto",
        }}
      >
        <span style={{ color: "#94a3b8", marginRight: "10px" }}>🌐 Select Language:</span>
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedLang(lang.code)}
            style={{
              background: selectedLang === lang.code 
                ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" 
                : "rgba(255,255,255,0.1)",
              border: "none",
              color: "white",
              padding: "8px 15px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: selectedLang === lang.code ? "bold" : "normal",
              fontSize: "0.85rem",
            }}
          >
            {lang.flag} {lang.name.split(" ")[1]}
          </motion.button>
        ))}
      </div>

      {/* Text Area */}
      <textarea
        value={news}
        onChange={(e) => setNews(e.target.value)}
        placeholder={`📰 Paste your news in ${languages.find(l => l.code === selectedLang)?.name.split(" ")[1] || "English"}...`}
        rows={8}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "15px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.05)",
          color: "white",
          outline: "none",
          resize: "none",
          fontSize: "15px",
          boxSizing: "border-box",
          fontFamily: selectedLang === "ar" ? "Arial" : "inherit",
          direction: selectedLang === "ar" ? "rtl" : "ltr",
        }}
      />

      {/* Buttons */}
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginTop: "20px" }}>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAnalyze} style={buttonStyle("#2563eb")}>
          🔍 Analyze
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleExample} style={buttonStyle("#9333ea")}>
          📋 Example
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleClear} style={buttonStyle("#dc2626")}>
          🧹 Clear
        </motion.button>
      </div>

      {/* Loader */}
      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: "25px", textAlign: "center" }}>
          <h3>🤖 AI Verifying Facts...</h3>
          <p style={{ color: "#94a3b8" }}>Analyzing in {languages.find(l => l.code === selectedLang)?.name.split(" ")[1]}</p>
          <motion.div animate={{ width: ["0%", "100%", "0%"] }} transition={{ duration: 2, repeat: Infinity }} 
            style={{ height: "10px", borderRadius: "20px", background: "linear-gradient(to right,#3b82f6,#8b5cf6)", marginTop: "15px" }} />
        </motion.div>
      )}

      {/* Result */}
      {result && (
        <motion.div initial={{ opacity: 0, rotateX: -20 }} animate={{ opacity: 1, rotateX: 0 }}
          style={{
            marginTop: "25px", padding: "20px", borderRadius: "20px",
            background: result.originalStatus === "REAL" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
            border: result.originalStatus === "REAL" ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(239,68,68,0.4)"
          }}
        >
          <h2 style={{ textAlign: "center" }}>{result.originalStatus === "REAL" ? `✅ ${result.status}` : `❌ ${result.status}`}</h2>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
          <p><strong>Reason:</strong> {result.reason}</p>
          <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginTop: "10px" }}>
            🌐 Analyzed in: {languages.find(l => l.code === selectedLang)?.name}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default NewsForm;