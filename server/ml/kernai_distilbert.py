import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer

# Load model and tokenizer
MODEL_NAME = "KernAI/stock-news-distilbert"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)


def classify_sentiment(text):
    """
    Classify the sentiment of a given text using a pre-trained DistilBERT model.
    """
    # Tokenize input text
    inputs = tokenizer(
        text, return_tensors="pt", truncation=True, padding=True, max_length=512
    )

    # Get model output
    with torch.no_grad():
        outputs = model(**inputs)

    # Convert logits to probabilities
    probs = torch.nn.functional.softmax(outputs.logits, dim=-1)

    return probs.tolist()[0]
