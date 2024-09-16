    // DHT11
  readDHT11Sensor();

  // Rain sensor
  checkRain(RAIN_SENSOR_PIN);

  // Ultrasonic
  readUltrasonicDistance(TRIG_PIN, ECHO_PIN);

  //check Status
  checkStatus();

  // Call the function to display the sensor readings on the LCD
  displaySensorReadings(tempC, humidity, rain_output, distance_cm);
