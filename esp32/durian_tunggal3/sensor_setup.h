  // DHT11
  DHT11_SENSOR_PIN.begin(); // initialize the DHT11 sensor / can be changed according to the name declared in line 5 'dht11'
  
  // Rain sensor
  pinMode(RAIN_SENSOR_PIN, INPUT);

  // Ultrasonic Sensor
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  // LCD
  lcd.init();
  lcd.backlight();