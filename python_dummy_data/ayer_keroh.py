import paho.mqtt.client as mqtt
import ssl
import random
import time
import json

# MQTT Broker details
broker = "43719f133ee64f1c88475e83fac1642f.s1.eu.hivemq.cloud"  # Replace with your actual broker address
port = 8883
username = "ayer_keroh"
password = "Ab123456"
topic = "zteFlood/flood/melaka/ayerkeroh"

# Define the on_connect callback
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected successfully to MQTT broker")
    else:
        print(f"Failed to connect, return code {rc}")

# Define the on_publish callback
def on_publish(client, userdata, mid):
    print(f"Message {mid} published.")

# Create an MQTT client instance
client = mqtt.Client()

# Set the username and password for the client
client.username_pw_set(username, password)

# Enable SSL/TLS support
client.tls_set(cert_reqs=ssl.CERT_NONE)  # CERT_NONE for self-signed certificates
client.tls_insecure_set(True)

# Attach the callback functions
client.on_connect = on_connect
client.on_publish = on_publish

# Connect to the MQTT broker
client.connect(broker, port)

# Start the network loop
client.loop_start()

def check_status(rain, distance_cm):
    if rain >= 2495 or distance_cm > 30:
        return "Danger"
    elif rain >= 1495 or distance_cm > 15:
        return "Warning"
    else:
        return "Safe"

try:
    while True:
        # Generate random rain value between 0 and 50
        rain = random.randint(0, 50)

        # Determine the rain output based on the rain value
        if rain == 0:
            rain_output = "No rain"
        elif 1 <= rain <= 30:
            rain_output = "Light Rain"
        else:  # 31 <= rain <= 50
            rain_output = "Heavy Rain"

        # Generate random distance value for publishing
        distance_cm = round(random.uniform(0, 50), 2)

        # Determine the status based on the conditions
        status = check_status(rain, distance_cm)

        data = {
            "tempC": round(random.uniform(25.0, 35.0), 2),
            "humidity": random.randint(50, 90),
            "rain": rain,
            "rain-output": rain_output,
            "distance_cm": distance_cm,
            "status": status,
            "date": time.strftime("%Y-%m-%d"),
            "time": time.strftime("%H:%M:%S")
        }

        # Convert data to JSON format
        message = json.dumps(data)

        # Publish the message to the topic
        result = client.publish(topic, message)

        # Block until the message is sent
        result.wait_for_publish()

        # Wait for 10 seconds before sending the next message
        time.sleep(5)

except KeyboardInterrupt:
    print("Publishing stopped by user.")

finally:
    # Stop the network loop and disconnect
    client.loop_stop()
    client.disconnect()
