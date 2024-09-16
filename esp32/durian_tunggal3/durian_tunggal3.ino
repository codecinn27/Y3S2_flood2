//maxbotix
#include "credentials.h"
#include "wifi_mqtt_define.h"
#include "sensor_define.h"
#include "telegram_define.h"
#include "loop_define.h"
#include "time_define.h"

void setup() {

  #include "sensor_setup.h"
  #include "wifi_setup.h"
  #include "time_setup.h"
  #include "mqtt_setup.h"
  
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  #include "time_loop.h"
  #include "sensor_loop.h"
  #include "mqtt_loop.h"
  #include "telegram_loop.h"
   
}
