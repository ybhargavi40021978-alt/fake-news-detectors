import pandas as pd
import os

# Create sample dataset
data = {
    'text': [
        # REAL NEWS (label=1)
        "NASA confirms discovery of water on Mars after years of satellite research",
        "Scientists develop new vaccine that prevents COVID-19 with 95% efficacy",
        "Government announces new policy for economic growth and job creation",
        "World Health Organization releases guidelines for healthy living",
        "Researchers discover new species of dinosaur in Argentina fossil site",
        "United Nations passes resolution for climate change action worldwide",
        "European Space Agency launches new satellite for earth observation",
        "New study shows benefits of meditation for mental health",
        "Tech company develops AI system to detect early stage cancer",
        "Breakthrough in renewable energy storage announced by scientists",
        
        # FAKE NEWS (label=0)
        "This product will make you rich in one day! Click here now limited offer",
        "You won't believe what this celebrity did! Shocking video inside must watch",
        "Make $10000 per week working from home! No experience needed apply now",
        "Miracle pill that cures all diseases - doctors hate this one simple trick",
        "The Earth is flat according to new research that scientists are hiding",
        "Breaking: Government hiding alien contact for decades secret files leaked",
        "One weird trick to lose weight instantly without exercise or dieting",
        "This natural herb cures diabetes in 3 days - pharmaceutical companies furious",
        "You have won a lottery! Send money to claim your prize of $1 million",
        "Secret method to hack any website and get free money revealed"
    ],
    'label': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

# Create DataFrame
df = pd.DataFrame(data)

# Save to CSV
df.to_csv('dataset/news.csv', index=False)

print(f"✅ Dataset created successfully!")
print(f"   Total samples: {len(df)}")
print(f"   Real news (label=1): {(df['label']==1).sum()}")
print(f"   Fake news (label=0): {(df['label']==0).sum()}")
print(f"   File saved: dataset/news.csv")