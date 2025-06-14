import os
from dotenv import load_dotenv

load_dotenv()

OPEN_API_KEY = os.getenv("OPENAI_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "gpt-4.1-mini")
TEMPERATURE = float(os.getenv("TEMPERATURE", 0.7))
