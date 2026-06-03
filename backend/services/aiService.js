// AI Service with ML Model Integration
const axios = require('axios');

const ML_API_URL = process.env.ML_API_URL || 'http://localhost:5001';

class AIService {
  constructor() {
    this.isMLAvailable = false;
    this.checkMLConnection();
  }

  async checkMLConnection() {
    try {
      const response = await axios.get(`${ML_API_URL}/health`, { timeout: 3000 });
      if (response.data && response.data.status === 'ok') {
        this.isMLAvailable = true;
        console.log('✅ ML Model API is connected and ready');
      }
    } catch (error) {
      this.isMLAvailable = false;
      console.log('⚠️ ML Model API not available, using fallback mode');
    }
  }

  async analyzeNews(text, language = 'en') {
    try {
      console.log(`🤖 Analyzing news in ${language}...`);
      console.log(`📝 Text preview: ${text.substring(0, 100)}...`);
      
      // Try to use ML API first
      if (this.isMLAvailable) {
        const response = await axios.post(`${ML_API_URL}/predict`, {
          text: text,
          language: language
        }, {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.result) {
          console.log(`✅ ML Model result: ${response.data.result} (${response.data.confidence}%)`);
          
          return {
            result: response.data.result,
            confidence: response.data.confidence,
            reason: response.data.reason || this.getReasonText(response.data.result, language),
            metadata: {
              model: "ML Model v1.0",
              language: language,
              source: "ml-api"
            }
          };
        }
      }
      
      // Fallback to intelligent analysis if ML API is not available
      console.log('⚠️ Using intelligent fallback analysis...');
      return this.intelligentAnalysis(text, language);
      
    } catch (error) {
      console.error('❌ Analysis Error:', error.message);
      
      // Fallback to intelligent analysis
      return this.intelligentAnalysis(text, language);
    }
  }

  intelligentAnalysis(text, language) {
    // Intelligent pattern-based analysis (no random)
    const textLower = text.toLowerCase();
    
    // Fake news indicators
    const fakeIndicators = [
      'click here', 'limited time', 'earn money', 'work from home', 'make money',
      'miracle', 'cure', 'doctors hate', 'you won\'t believe', 'shocking',
      'secret', 'hidden', 'government hiding', 'alien', 'lottery', 'win prize',
      'free money', 'rich in one day', 'no experience needed', 'instant results'
    ];
    
    // Real news indicators
    const realIndicators = [
      'nasa', 'scientists', 'research', 'study shows', 'confirmed',
      'discovery', 'breakthrough', 'official', 'government announces',
      'united nations', 'who', 'health organization', 'university',
      'published', 'research paper', 'clinical trial', 'approved'
    ];
    
    let fakeScore = 0;
    let realScore = 0;
    
    // Check fake indicators
    for (let indicator of fakeIndicators) {
      if (textLower.includes(indicator)) {
        fakeScore++;
      }
    }
    
    // Check real indicators
    for (let indicator of realIndicators) {
      if (textLower.includes(indicator)) {
        realScore++;
      }
    }
    
    // Calculate confidence
    let isReal = realScore > fakeScore;
    let confidence = 0;
    
    if (isReal) {
      confidence = Math.min(95, 60 + (realScore * 10));
    } else {
      confidence = Math.min(95, 60 + (fakeScore * 10));
    }
    
    // Ensure minimum confidence
    confidence = Math.max(65, confidence);
    
    const result = isReal ? 'REAL' : 'FAKE';
    const reason = this.getReasonText(result, language);
    
    console.log(`📊 Analysis completed: ${result} (${confidence}% confidence)`);
    
    return {
      result: result,
      confidence: confidence,
      reason: reason,
      metadata: {
        model: "Intelligent Analyzer v1.0",
        language: language,
        source: "fallback",
        realScore: realScore,
        fakeScore: fakeScore
      }
    };
  }

  getReasonText(result, language) {
    const reasons = {
      REAL: {
        en: "✅ This news appears to be REAL. The content contains credible indicators and matches patterns found in reliable sources.",
        hi: "✅ यह समाचार वास्तविक प्रतीत होता है। सामग्री में विश्वसनीय संकेतक हैं और विश्वसनीय स्रोतों से मेल खाते हैं।",
        ta: "✅ இந்த செய்தி உண்மையானதாக தோன்றுகிறது. உள்ளடக்கம் நம்பகமான குறிகாட்டிகளைக் கொண்டுள்ளது மற்றும் நம்பகமான ஆதாரங்களுடன் பொருந்துகிறது.",
        te: "✅ ఈ వార్త నిజమైనదిగా కనిపిస్తుంది. కంటెంట్ నమ్మదగిన సూచికలను కలిగి ఉంది మరియు నమ్మకమైన మూలాలతో సరిపోలింది.",
        ml: "✅ ഈ വാർത്ത യഥാർത്ഥമാണെന്ന് തോന്നുന്നു. ഉള്ളടക്കത്തിൽ വിശ്വസനീയമായ സൂചകങ്ങൾ ഉണ്ട്, വിശ്വസനീയമായ ഉറവിടങ്ങളുമായി പൊരുത്തപ്പെടുന്നു.",
        kn: "✅ ಈ ಸುದ್ದಿ ನಿಜವೆಂದು ತೋರುತ್ತದೆ. ವಿಷಯವು ವಿಶ್ವಾಸಾರ್ಹ ಸೂಚಕಗಳನ್ನು ಹೊಂದಿದೆ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಮೂಲಗಳೊಂದಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.",
        bn: "✅ এই খবরটি বাস্তব বলে মনে হচ্ছে। বিষয়বস্তু বিশ্বাসযোগ্য সূচক ধারণ করে এবং নির্ভরযোগ্য উৎসের সাথে মেলে।",
        es: "✅ Esta noticia parece REAL. El contenido contiene indicadores creíbles y coincide con patrones de fuentes confiables.",
        fr: "✅ Cette information semble RÉELLE. Le contenu contient des indicateurs crédibles et correspond aux sources fiables.",
        de: "✅ Diese Nachricht scheint ECHT zu sein. Der Inhalt enthält glaubwürdige Indikatoren und entspricht vertrauenswürdigen Quellen.",
        zh: "✅ 这条新闻看起来是真实的。内容包含可信指标，与可靠来源的模式相符。",
        ja: "✅ このニュースは本物のように見えます。内容には信頼できる指標が含まれており、信頼できるソースと一致しています。",
        ar: "✅ يبدو أن هذا الخبر حقيقي. يحتوي المحتوى على مؤشرات موثوقة ويتطابق مع المصادر الموثوقة."
      },
      FAKE: {
        en: "⚠️ This news appears to be FAKE. The content contains suspicious patterns commonly found in misleading information.",
        hi: "⚠️ यह समाचार नकली प्रतीत होता है। सामग्री में संदिग्ध पैटर्न हैं जो आमतौर पर गलत सूचना में पाए जाते हैं।",
        ta: "⚠️ இந்த செய்தி போலியானதாக தோன்றுகிறது. உள்ளடக்கம் தவறான தகவல்களில் பொதுவாகக் காணப்படும் சந்தேகத்திற்கிடமான வடிவங்களைக் கொண்டுள்ளது.",
        te: "⚠️ ఈ వార్త తప్పుడుగా కనిపిస్తుంది. కంటెంట్ తప్పుదోవ పట్టించే సమాచారంలో సాధారణంగా కనిపించే అనుమానాస్పద నమూనాలను కలిగి ఉంది.",
        ml: "⚠️ ഈ വാർത്ത വ്യാജമാണെന്ന് തോന്നുന്നു. ഉള്ളടക്കത്തിൽ തെറ്റിദ്ധരിപ്പിക്കുന്ന വിവരങ്ങളിൽ സാധാരണയായി കാണപ്പെടുന്ന സംശയാസ്പദമായ പാറ്റേണുകൾ അടങ്ങിയിരിക്കുന്നു.",
        kn: "⚠️ ಈ ಸುದ್ದಿ ನಕಲಿಯಾಗಿ ಕಾಣುತ್ತದೆ. ವಿಷಯವು ತಪ್ಪುದಾರಿಗೆಳೆಯುವ ಮಾಹಿತಿಯಲ್ಲಿ ಸಾಮಾನ್ಯವಾಗಿ ಕಂಡುಬರುವ ಅನುಮಾನಾಸ್ಪದ ಮಾದರಿಗಳನ್ನು ಹೊಂದಿದೆ.",
        bn: "⚠️ এই খবরটি মিথ্যা বলে মনে হচ্ছে। বিষয়বস্তুতে সন্দেহজনক প্যাটার্ন রয়েছে যা সাধারণত বিভ্রান্তিকর তথ্যে পাওয়া যায়।",
        es: "⚠️ Esta noticia parece FALSA. El contenido contiene patrones sospechosos comúnmente encontrados en información engañosa.",
        fr: "⚠️ Cette information semble FAUSSE. Le contenu contient des motifs suspects couramment trouvés dans les informations trompeuses.",
        de: "⚠️ Diese Nachricht scheint FALSCH zu sein. Der Inhalt enthält verdächtige Muster, die häufig in irreführenden Informationen zu finden sind.",
        zh: "⚠️ 这条新闻看起来是假的。内容包含误导信息中常见的可疑模式。",
        ja: "⚠️ このニュースは偽物のように見えます。内容には、誤解を招く情報によく見られる疑わしいパターンが含まれています。",
        ar: "⚠️ يبدو أن هذا الخبر مزيف. يحتوي المحتوى على أنماط مشبوهة توجد عادة في المعلومات المضللة."
      }
    };
    
    return reasons[result]?.[language] || reasons[result]?.en || 
           (result === 'REAL' ? "✅ Verified content appears to be credible" : "⚠️ Content shows suspicious patterns");
  }

  async batchAnalyze(articles) {
    try {
      if (this.isMLAvailable) {
        const response = await axios.post(`${ML_API_URL}/batch-predict`, {
          articles: articles
        }, {
          timeout: 30000,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.results) {
          return response.data.results;
        }
      }
      
      // Fallback: analyze each article individually
      const results = [];
      for (const article of articles) {
        const result = await this.analyzeNews(article.text, article.language || 'en');
        results.push({
          text: article.text.substring(0, 100) + '...',
          result: result.result,
          confidence: result.confidence
        });
      }
      return results;
      
    } catch (error) {
      console.error('❌ Batch analysis error:', error.message);
      return [];
    }
  }

  async getLanguageSupport() {
    return {
      supported: ['en', 'hi', 'ta', 'te', 'ml', 'kn', 'bn', 'es', 'fr', 'de', 'zh', 'ja', 'ar'],
      total: 13,
      names: {
        en: 'English', hi: 'Hindi', ta: 'Tamil', te: 'Telugu', ml: 'Malayalam',
        kn: 'Kannada', bn: 'Bengali', es: 'Spanish', fr: 'French', de: 'German',
        zh: 'Chinese', ja: 'Japanese', ar: 'Arabic'
      }
    };
  }

  async getModelInfo() {
    try {
      if (this.isMLAvailable) {
        const response = await axios.get(`${ML_API_URL}/model-info`);
        return response.data;
      }
      return {
        success: true,
        model_type: 'Intelligent Analyzer',
        features: 'Pattern-based detection',
        status: 'fallback_mode'
      };
    } catch (error) {
      console.error('❌ Failed to get model info:', error.message);
      return null;
    }
  }
}

module.exports = new AIService();