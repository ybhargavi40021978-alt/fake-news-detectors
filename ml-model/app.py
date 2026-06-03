from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import os
import numpy as np

# Download NLTK data
nltk.download('stopwords', quiet=True)
nltk.download('punkt', quiet=True)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize stemmer and stopwords
stemmer = PorterStemmer()
stop_words = set(stopwords.words('english'))

# Global variables for model and vectorizer
model = None
vectorizer = None

def preprocess_text(text):
    """Clean and preprocess text data"""
    if not text:
        return ""
    
    # Convert to lowercase
    text = str(text).lower()
    
    # Remove special characters and digits
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Tokenize and remove stopwords, then stem
    words = text.split()
    words = [stemmer.stem(word) for word in words if word not in stop_words]
    
    return ' '.join(words)

def load_model():
    """Load the trained model and vectorizer"""
    global model, vectorizer
    
    model_path = 'model/fake_news_model.pkl'
    vectorizer_path = 'model/vectorizer.pkl'
    
    if os.path.exists(model_path) and os.path.exists(vectorizer_path):
        model = joblib.load(model_path)
        vectorizer = joblib.load(vectorizer_path)
        print("✅ Model and vectorizer loaded successfully!")
        return True
    else:
        print("❌ Model files not found. Please run train_model.py first.")
        return False

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'message': 'ML Model API is running',
        'model_loaded': model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    """Predict whether news is real or fake"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        text = data.get('text', '')
        language = data.get('language', 'en')
        
        if not text:
            return jsonify({'error': 'Text is required'}), 400
        
        if model is None or vectorizer is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        # Preprocess text
        processed_text = preprocess_text(text)
        
        # Vectorize
        features = vectorizer.transform([processed_text])
        
        # Predict
        prediction = model.predict(features)[0]
        confidence = model.predict_proba(features)[0].max()
        
        # Get prediction result
        result = 'REAL' if prediction == 1 else 'FAKE'
        
        # Generate reason based on result
        if result == 'REAL':
            reason = "✅ The content appears to be credible based on verified patterns and trusted sources."
        else:
            reason = "⚠️ Suspicious patterns detected. The content shows characteristics commonly found in misleading information."
        
        return jsonify({
            'success': True,
            'result': result,
            'confidence': round(confidence * 100, 2),
            'reason': reason,
            'language': language
        })
        
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/batch-predict', methods=['POST'])
def batch_predict():
    """Predict multiple news articles at once"""
    try:
        data = request.get_json()
        
        if not data or 'articles' not in data:
            return jsonify({'error': 'Articles array is required'}), 400
        
        articles = data['articles']
        results = []
        
        for article in articles:
            text = article.get('text', '')
            if text:
                processed_text = preprocess_text(text)
                features = vectorizer.transform([processed_text])
                prediction = model.predict(features)[0]
                confidence = model.predict_proba(features)[0].max()
                
                results.append({
                    'text': text[:100] + '...',
                    'result': 'REAL' if prediction == 1 else 'FAKE',
                    'confidence': round(confidence * 100, 2)
                })
        
        return jsonify({
            'success': True,
            'results': results
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/model-info', methods=['GET'])
def model_info():
    """Get model information"""
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    return jsonify({
        'success': True,
        'model_type': type(model).__name__,
        'features': vectorizer.get_feature_names_out().shape[0] if vectorizer else 0,
        'status': 'loaded'
    })

if __name__ == '__main__':
    print("\n" + "="*50)
    print("🤖 FAKE NEWS DETECTION ML API")
    print("="*50)
    
    # Load model
    if load_model():
        print("\n🚀 Starting Flask server...")
        print("📍 API URL: http://localhost:5001")
        print("📡 Health Check: http://localhost:5001/health")
        print("🔮 Prediction: POST http://localhost:5001/predict")
        print("\n" + "="*50 + "\n")
        
        app.run(host='0.0.0.0', port=5001, debug=True)
    else:
        print("\n⚠️ Please run 'python train_model.py' first to train the model.")