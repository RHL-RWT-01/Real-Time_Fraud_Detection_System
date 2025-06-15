from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import Transaction
from .kafka_producer import send_to_kafka
from .notification_producer import send_notification  # ✅ NEW
import os
from threading import Thread
from .kafka_consumer import start_kafka_consumer
from .kafka_notification_consumer import start_kafka_notification_consumer  
app = FastAPI()

# Enable CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def start_consumers():
    Thread(target=start_kafka_consumer, daemon=True).start()
    Thread(target=start_kafka_notification_consumer, daemon=True).start()


@app.get("/")
def health():
    return {"message": "Backend up and running"}

@app.post("/transaction")
def receive_transaction(data: Transaction):
    try:
        # Send to transaction topic
        send_to_kafka(os.getenv("KAFKA_TOPIC"), data.dict())

        # OPTIONAL: Detect suspicious or high-value transactions
        if data.amount > 10000:  # You can define any logic
            message = (
                f"🚨 Suspicious transaction detected:\n"
                f"Amount: ₹{data.amount}\n"
                f"Location: {data.location}"
            )
            send_notification(user_id=data.user_id, email=f"{data.user_id}@example.com", message=message)

        return {"message": "Transaction and notification processed"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
