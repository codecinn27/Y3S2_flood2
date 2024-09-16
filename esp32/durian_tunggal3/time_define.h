#include <NTPClient.h> // for timestamp purpose, by Fabrice Weinberg
#include <WiFiUdp.h>
#include <TimeLib.h> // Include TimeLib

// Create an instance of WiFiUDP and NTPClient
WiFiUDP udp;
NTPClient timeClient(udp, "pool.ntp.org", 3600 * 8, 60000); // Offset for Malaysia (UTC+8), update every 60 seconds
