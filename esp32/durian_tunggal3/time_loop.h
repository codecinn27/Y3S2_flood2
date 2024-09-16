  timeClient.update();

  // Get the current epoch time
  time_t rawTime = timeClient.getEpochTime();

  // Convert epoch time to local time (struct tm)
  setTime(rawTime); // Set time for TimeLib functions
  String formattedDate = String(year()) + "-" + String(month()) + "-" + String(day());
  String formattedTime = String(hour()) + ":" + String(minute()) + ":" + String(second());

  // Print formatted date and time
  // Serial.println("Current date: " + formattedDate);
  // Serial.println("Current time: " + formattedTime);

    // Delay for demonstration purposes
  // delay(1000); // Update every 1 seconds