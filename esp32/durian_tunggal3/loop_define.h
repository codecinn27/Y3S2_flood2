unsigned long previousMillis = 0;
const long interval = 5000; // interval of 5 seconds for the data to be updated to FavorIot
//telegram interval
unsigned long previousAlertMillis = 0; // Stores the last time an alert message was sent
const long alertInterval = 60000;      // Interval for sending Telegram alert (1 minute)
