
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;  

    // Call the function to publish sensor data
    publishSensorData(tempC, humidity, rain_output, distance_cm, rain, formattedDate, formattedTime, status);
  }