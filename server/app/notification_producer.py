import json
import os
from confluent_kafka import Producer
from dotenv import load_dotenv

load_dotenv()

KAFKA_BOOTSTRAP_SERVERS = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092")
NOTIFICATION_TOPIC = os.getenv("NOTIFICATION_TOPIC", "notifications")

producer_conf = {
    "bootstrap.servers": KAFKA_BOOTSTRAP_SERVERS
}

producer = Producer(producer_conf)


def send_notification(user_id: str, email: str, message: str):
    notification_event = {
        "user_id": user_id,
        "email": email,
        "message": message
    }

    try:
        producer.produce(
            topic=NOTIFICATION_TOPIC,
            key=user_id,
            value=json.dumps(notification_event)
        )
        producer.flush()
        print(f"✅ Notification sent for user {user_id}")
    except Exception as e:
        print(f"❌ Failed to send notification: {e}")


if __name__ == "__main__":
    # Example usage
    send_notification(
        user_id="user123",
        email="user123@example.com",
        message="⚠️ A suspicious login was detected from a new device."
    )
