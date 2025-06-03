from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import Transaction
from .kafka_producer import send_to_kafka
import os

app = FastAPI()

# Enable CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"message": "Backend up and running"}

@app.post("/transaction")
def receive_transaction(data: Transaction):
    try:
        send_to_kafka(os.getenv("KAFKA_TOPIC"), data.dict())
        return {"message": "Transaction sent to Kafka"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
