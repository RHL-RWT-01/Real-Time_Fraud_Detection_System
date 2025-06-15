import json
import os
from confluent_kafka import Consumer, Producer
from dotenv import load_dotenv

load_dotenv()

KAFKA_BOOTSTRAP_SERVERS = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092")
ALERT_TOPIC = os.getenv("ALERT_TOPIC", "alerts")
NOTIFICATION_TOPIC = os.getenv("NOTIFICATION_TOPIC", "notifications")

# Kafka consumer config
consumer_conf = {
    "bootstrap.servers": KAFKA_BOOTSTRAP_SERVERS,
    "group.id": "notification-group",
    "auto.offset.reset": "earliest"
}

# Kafka producer config
producer_conf = {
    "bootstrap.servers": KAFKA_BOOTSTRAP_SERVERS
}

consumer = Consumer(consumer_conf)
producer = Producer(producer_conf)

consumer.subscribe([ALERT_TOPIC])


def send_to_notification_topic(notification: dict):
    try:
        producer.produce(
            NOTIFICATION_TOPIC,
            key=notification.get("user_id", "unknown"),
            value=json.dumps(notification),
        )
        producer.flush()
        print(f"🔔 Notification event sent for user {notification.get('user_id')}")
    except Exception as e:
        print(f"[ERROR] Failed to send notification: {e}")


print("📬 Notification consumer started...")

try:
    while True:
        msg = consumer.poll(1.0)
        if msg is None:
            continue
        if msg.error():
            print(f"[ERROR] Kafka error: {msg.error()}")
            continue

        try:
            alert = json.loads(msg.value().decode("utf-8"))
            user_id = alert.get("user_id", "Unknown")
            amount = alert.get("amount")
            location = alert.get("location")
            email = alert.get("email") or f"{user_id}@example.com"

            notification_event = {
                "user_id": user_id,
                "email": email,
                "message": f"⚠️ Fraud alert: ₹{amount} at {location}. If this wasn't you, take action."
            }

            send_to_notification_topic(notification_event)

        except Exception as e:
            print(f"[ERROR] Failed to process message: {e}")

except KeyboardInterrupt:
    print("Shutting down consumer...")

finally:
    consumer.close()
