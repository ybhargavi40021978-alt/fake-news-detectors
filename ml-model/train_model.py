import pandas as pd
import numpy as np
import re
import nltk
import os
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import joblib
import warnings
warnings.filterwarnings('ignore')

# Download NLTK data if not already downloaded
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', quiet=True)

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords', quiet=True)

# Initialize
stemmer = PorterStemmer()
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    if pd.isna(text) or text is None:
        return ""
    text = str(text).lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    words = text.split()
    words = [stemmer.stem(word) for word in words if word not in stop_words]
    return ' '.join(words)

def create_dataset_if_not_exists():
    """Create dataset if it doesn't exist"""
    if os.path.exists('dataset/news.csv'):
        df = pd.read_csv('dataset/news.csv')
        if len(df) > 0:
            return df['text'], df['label']
    
    print("📝 Creating new dataset...")
    data = {
        'text': [
            "NASA confirms discovery of water on Mars after satellite research",
            "Scientists develop new vaccine for COVID-19 with high efficacy",
            "Government announces new economic policy for growth",
            "WHO releases guidelines for healthy living and diet",
            "Researchers discover new dinosaur species in Argentina",
            "UN passes resolution for climate change action worldwide",
            "ESA launches new satellite for earth observation",
            "New study shows benefits of meditation for mental health",
            "AI system developed to detect cancer at early stage",
            "Breakthrough in renewable energy storage announced",
            "Make $10000 per week working from home! Click now",
            "You won't believe what this celebrity did! Shocking video",
            "Miracle pill cures all diseases - doctors hate this",
            "The Earth is flat according to new research",
            "Government hiding alien contact for decades",
            "One weird trick to lose weight instantly",
            "Natural herb cures diabetes in 3 days",
            "You won a lottery! Send money to claim prize",
            "Secret method to get free money from government",
            "This product will make you rich in one day"
        ],
        'label': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    
    df = pd.DataFrame(data)
    os.makedirs('dataset', exist_ok=True)
    df.to_csv('dataset/news.csv', index=False)
    print(f"✅ Dataset created with {len(df)} samples")
    return df['text'], df['label']

def train_model():
    print("\n" + "="*60)
    print("🤖 FAKE NEWS DETECTION MODEL TRAINING")
    print("="*60)
    
    # Load or create dataset
    X_text, y = create_dataset_if_not_exists()
    
    print(f"\n📊 Dataset Info:")
    print(f"   Total samples: {len(X_text)}")
    print(f"   Real news (REAL): {(y == 1).sum()}")
    print(f"   Fake news (FAKE): {(y == 0).sum()}")
    
    # Preprocess
    print("\n🔄 Preprocessing text...")
    X_processed = [preprocess_text(text) for text in X_text]
    
    # Vectorize
    print("📊 Creating features...")
    vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
    X = vectorizer.fit_transform(X_processed)
    print(f"   Feature shape: {X.shape}")
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Train model
    print("\n🤖 Training model...")
    model = LogisticRegression(max_iter=1000, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"\n✅ Model Accuracy: {accuracy*100:.2f}%")
    print("\n📋 Classification Report:")
    print(classification_report(y_test, y_pred, target_names=['FAKE', 'REAL']))
    
    # Save model
    os.makedirs('model', exist_ok=True)
    joblib.dump(model, 'model/fake_news_model.pkl')
    joblib.dump(vectorizer, 'model/vectorizer.pkl')
    
    print("\n💾 Model saved successfully!")
    print(f"   Model: model/fake_news_model.pkl")
    print(f"   Vectorizer: model/vectorizer.pkl")
    
    return model, vectorizer, accuracy

def test_model():
    print("\n" + "="*60)
    print("🧪 TESTING THE MODEL")
    print("="*60)
    
    if not os.path.exists('model/fake_news_model.pkl'):
        print("❌ Model not found. Train first!")
        return
    
    model = joblib.load('model/fake_news_model.pkl')
    vectorizer = joblib.load('model/vectorizer.pkl')
    
    test_news = [
        "NASA discovers water on Mars in major breakthrough",
        "Earn $5000 daily working from home! Limited time offer",
        "Scientists find new treatment for Alzheimer's disease"
    ]
    
    print("\n📝 Test Results:\n")
    for text in test_news:
        processed = preprocess_text(text)
        features = vectorizer.transform([processed])
        pred = model.predict(features)[0]
        prob = model.predict_proba(features)[0].max()
        
        result = "✅ REAL NEWS" if pred == 1 else "❌ FAKE NEWS"
        print(f"Text: {text[:50]}...")
        print(f"Result: {result} (Confidence: {prob*100:.1f}%)\n")

if __name__ == "__main__":
    train_model()
    test_model()
    print("\n" + "="*60)
    print("✅ Training completed successfully!")
    print("="*60)