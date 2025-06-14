import os
import json
from confluent_kafka import Consumer, KafkaException
from dotenv import load_dotenv

load_dotenv()

conf = {
    "bootstrap.servers": os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092"),
    "group.id": "transaction-consumers",
    "auto.offset.reset": "earliest"
}

consumer = Consumer(conf)

topic = os.getenv("KAFKA_TOPIC", "transactions")
consumer.subscribe([topic])

print(f"Listening to Kafka topic '{topic}'...")

try:
    while True:
        msg = consumer.poll(timeout=1.0)
        if msg is None:
            continue
        if msg.error():
            raise KafkaException(msg.error())

        # Parse and print the message
        data = json.loads(msg.value().decode("utf-8"))
        print(f"📥 Received: {json.dumps(data, indent=2)}")

except KeyboardInterrupt:
    print(" Stopped by user")

finally:
    consumer.close()
