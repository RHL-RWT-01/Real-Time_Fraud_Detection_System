import json
import os
from confluent_kafka import Producer
from dotenv import load_dotenv

load_dotenv()

conf = {
    "bootstrap.servers": os.getenv("KAFKA_BOOTSTRAP_SERVERS")
}
producer = Producer(conf)

def delivery_report(err, msg):
    if err is not None:
        print(f"Delivery failed: {err}")
    else:
        print(f"Message sent to {msg.topic()} partition {msg.partition()}")

def send_to_kafka(topic: str, value: dict):
    producer.produce(
        topic=topic,
        key=value.get("user_id", ""),
        value=json.dumps(value),
        callback=delivery_report
    )
    producer.poll(0)  # trigger delivery callback
