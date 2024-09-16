
  // Set the MQTT server details
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  // Ensure the WiFiClientSecure is properly configured for SSL
  espClient.setInsecure();  // Note: This is not secure, ideally you should set proper SSL certificates