#include <WiFi.h>           // Include the WiFi library
#include <WiFiClientSecure.h>  // Ensure this library is included for secure connections
#include <HTTPClient.h> //for telegram and wifi
#include <PubSubClient.h>   // Include the PubSubClient library
#include <ArduinoJson.h> //mqtt payload and telegram send message, ArduinoJson library by Benoît Blanchon

// Create instances for WiFi and MQTT clients
WiFiClientSecure espClient;
PubSubClient client(espClient);

// Callback function to handle incoming messages
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ArduinoClient", mqtt_user, mqtt_password)) {
      Serial.println("connected");
      // Subscribe to a topic
      client.subscribe(topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

// Inside your loop or function where you want to publish:
void publishSensorData(float tempC, float humidity, String rain_output, float distance_cm, float rain, String formattedDate, String formattedTime, String status) {
  // Create a JSON object
  StaticJsonDocument<200> jsonDoc;
  
  // Add sensor readings to the JSON object
  jsonDoc["tempC"] = tempC;
  jsonDoc["humidity"] = humidity;
  jsonDoc["rain_output"] = rain_output;
  jsonDoc["rain"] = rain;
  jsonDoc["distance_cm"] = distance_cm;
  jsonDoc["date"] = formattedDate;
  jsonDoc["time"] = formattedTime;
  jsonDoc["status"] = status;
  
  // Serialize the JSON object to a string
  char jsonString[200];
  serializeJson(jsonDoc, jsonString);
  
  // Publish the JSON string to the topic "test/1"
  client.publish(topic, jsonString);
  
  // Print the JSON string to the Serial Monitor
  Serial.print("Published sensor data: ");
  Serial.println(jsonString);
}

