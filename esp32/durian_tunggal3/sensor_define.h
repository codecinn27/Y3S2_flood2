#include <DHT.h>  //dht sensor library by Adafruit
#include <LiquidCrystal_I2C.h> // LiquidCrystal I2C by Frank de Brabander

// Define the input pins
DHT DHT11_SENSOR_PIN(4, DHT11);
#define RAIN_SENSOR_PIN 34 
#define TRIG_PIN 33
#define ECHO_PIN 32
LiquidCrystal_I2C lcd(0x27, 20, 4);  // set the LCD address to 0x27 for a 20 chars and 4 line display

float humidity;
float tempC;
float tempF;
String rain_output;
float distance_cm;
float rain;
float zeroRain = 4095; //no rain detect will output 4095
String status= "Safe"; //Safe, Warning, Danger

// Function to read from the DHT11 sensor and return the readings
void readDHT11Sensor() {
  // Read humidity
  humidity = DHT11_SENSOR_PIN.readHumidity();

  // Read temperature in Celsius
  tempC = DHT11_SENSOR_PIN.readTemperature();
  
  // Check whether the reading is successful or not
  if (isnan(tempC) || isnan(humidity)) {
    Serial.println("Failed to read from DHT11 sensor!");
  } else {
    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.print("%  |  Temperature: ");
    Serial.print(tempC);
    Serial.print("°C  ~  ");
  }
  
}

// Function to read from the rain sensor and return the reading 
void checkRain(int rainSensorPin) {
  rain = zeroRain - analogRead(rainSensorPin);
  if(rain>=2200){
    rain_output = "Heavy rain";
    Serial.println("Heavy rain");
  }else if (rain >= 400) {
    rain_output = "Light rain";
    Serial.println("Light rain");
  }
  else {
    rain_output = "No rain";
    Serial.println("No rain");
  }
  Serial.println(rain);
}

// Function to read from the ultrasonic sensor and return the reading 
void readUltrasonicDistance(int trigP, int echoP) {
  digitalWrite(trigP, LOW);
  delayMicroseconds(2);
  digitalWrite(trigP, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigP, LOW);

  long duration = pulseIn(echoP, HIGH);
  //Serial.println(duration);
  distance_cm = duration * 0.0343 / 2.0; // Calculate distance in centimeters

  // Convert distance_cm to a string with 2 decimal places and back to a float
  distance_cm = String(distance_cm, 2).toFloat();
  distance_cm = 60- distance_cm;

}

void displaySensorReadings(float tempC, float humidity, String rain, float distance) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Temp: " + String(tempC, 2) + "C " );
  lcd.setCursor(0, 1);
  lcd.print("Hum: " + String(humidity, 2) + "%");
  lcd.setCursor(0, 2);
  lcd.print("Rain: " + rain);
  lcd.setCursor(0, 3);
  lcd.print("Water Lvl: " + String(distance, 2) + "cm ");
  delay(200);
  // Depending on your display size, you may need to create additional pages or scroll text to display all information.
}

void checkStatus(){
  if(rain>=2495 || distance_cm>30){
    status = "Danger";
  }else if(rain>=1495 || distance_cm>15){
    status = "Warning";
  }else{
    status = "Safe";
  }
  Serial.println("Status: " + status);
}