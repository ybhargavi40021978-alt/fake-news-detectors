import requests
import json

def test_ml_api():
    """Test the ML model API"""
    
    base_url = "http://localhost:5001"
    
    # Test health check
    print("="*50)
    print("🧪 TESTING ML MODEL API")
    print("="*50)
    
    # Test 1: Health Check
    print("\n1️⃣ Testing Health Check...")
    try:
        response = requests.get(f"{base_url}/health")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
    except Exception as e:
        print(f"   Error: {e}")
    
    # Test 2: Single Prediction
    print("\n2️⃣ Testing Single Prediction...")
    test_news = [
        {
            "text": "NASA confirms discovery of water on Mars after years of satellite research.",
            "language": "en"
        },
        {
            "text": "BREAKING: You can earn $10,000 per week working from home! No experience needed!",
            "language": "en"
        },
        {
            "text": "Scientists discover new treatment for Alzheimer's disease in clinical trials.",
            "language": "en"
        }
    ]
    
    for news in test_news:
        try:
            response = requests.post(
                f"{base_url}/predict",
                json=news,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                result = response.json()
                print(f"\n   📰 News: {news['text'][:60]}...")
                print(f"   📊 Result: {result['result']}")
                print(f"   🎯 Confidence: {result['confidence']}%")
                print(f"   💡 Reason: {result['reason'][:80]}...")
            else:
                print(f"   Error: {response.status_code}")
        except Exception as e:
            print(f"   Error: {e}")
    
    # Test 3: Batch Prediction
    print("\n\n3️⃣ Testing Batch Prediction...")
    batch_data = {
        "articles": test_news
    }
    
    try:
        response = requests.post(
            f"{base_url}/batch-predict",
            json=batch_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            results = response.json()
            print(f"   ✅ Batch prediction successful!")
            for i, res in enumerate(results.get('results', []), 1):
                print(f"\n   Article {i}: {res['result']} (Confidence: {res['confidence']}%)")
        else:
            print(f"   Error: {response.status_code}")
    except Exception as e:
        print(f"   Error: {e}")
    
    print("\n" + "="*50)
    print("✅ Testing completed!")
    print("="*50)

if __name__ == "__main__":
    test_ml_api()