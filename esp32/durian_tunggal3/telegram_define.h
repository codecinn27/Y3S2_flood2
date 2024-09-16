#define HTTP_CODE_OK 200
#define HTTP_CODE_ACCEPTED 202


void sendTelegramMessage(String message) {

  WiFiClientSecure client;
  client.setInsecure(); // Bypass SSL verification

  HTTPClient http;
  String url = "https://api.telegram.org/bot" + String(telegramBotToken) + "/sendMessage";
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["chat_id"] = telegramChatId;
  jsonDoc["text"] = message;

  String jsonString;
  serializeJson(jsonDoc, jsonString);

  Serial.println("Sending to Telegram: " + jsonString); // Debugging output

  http.begin(client,url);
  http.addHeader("Content-Type", "application/json");

  int httpCode = http.POST(jsonString);
  if (httpCode > 0) {
    Serial.printf("[HTTP] POST to Telegram... code: %d\n", httpCode);
    if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_ACCEPTED) {
      String payload = http.getString();
      Serial.println("Telegram response: " + payload);
    } else {
      Serial.printf("Telegram error code: %d\n", httpCode);
      String payload = http.getString();
      Serial.println("Error response: " + payload);
    }
  } else {
    Serial.printf("[HTTP] POST to Telegram... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }
  http.end();
}

void sendAlertMessage(String status, float tempC, float tempF, float humidity, String rain_output, float distance_cm) {
  String alertMessage;
  
  if (status == "Danger") {
    alertMessage = "Alert: Water level is critically high!\n";
    alertMessage += "Location: Durian Tunggal\n";
    alertMessage += "Temperature: " + String(tempC) + " °C / " + String(tempF) + " °F\n";
    alertMessage += "Humidity: " + String(humidity) + "%\n";
    alertMessage += "Rain: " + rain_output + "\n";
    alertMessage += "Distance: " + String(distance_cm) + " cm\n";
    alertMessage += "Evacuate immediately due to flood risk!";
  } else if (status == "Warning") {
    alertMessage = "Warning: Water level is high!\n";
    alertMessage += "Location: Durian Tunggal\n";
    alertMessage += "Temperature: " + String(tempC) + " °C / " + String(tempF) + " °F\n";
    alertMessage += "Humidity: " + String(humidity) + "%\n";
    alertMessage += "Rain: " + rain_output + "\n";
    alertMessage += "Distance: " + String(distance_cm) + " cm\n";
    alertMessage += "Please remain vigilant and closely monitor the situation to ensure timely evacuation in case of a potential flood.";
  }

  // Send the alert message via Telegram
  sendTelegramMessage(alertMessage);
}