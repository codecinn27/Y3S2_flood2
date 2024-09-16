    // Check if it's time to send an alert message
  if (currentMillis - previousAlertMillis >= alertInterval) {
    previousAlertMillis = currentMillis; 

    // Send the alert based on the current status
    sendAlertMessage(status, tempC, tempF, humidity, rain_output, distance_cm);
  }