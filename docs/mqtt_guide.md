# Title: Guide on using MQTTX to send dummy data to the application

## Steps
Step 1: Install any mqtt client 
- what I used is MQTTX

Step 2: Connect to the MQTT server

Step 3: Publish message using the sample data below

**Topic**
- Ayer Keroh topic: zteFlood/flood/melaka/ayerkeroh
- Durian Tunggal topic: zteFlood/flood/melaka/duriantunggal

## MQTT Dummy Data Samples
1. SAFE Status (rain < 1495 AND distance_cm ≤ 15)

```json
{
  "tempC": 26.5,
  "humidity": 68,
  "rain": 25,
  "rain_output": "Light Rain",
  "distance_cm": 8.5,
  "status": "Safe",
  "date": "2024-01-21",
  "time": "10:30:45"
}
```
```json
{
  "tempC": 28.2,
  "humidity": 72,
  "rain": 10,
  "rain_output": "Light Rain",
  "distance_cm": 12.3,
  "status": "Safe",
  "date": "2024-01-21",
  "time": "10:32:47"
}
```

2. WARNING Status (rain ≥ 1495 OR distance_cm > 15, but not Danger)
```json
{
  "tempC": 30.1,
  "humidity": 75,
  "rain": 1495,
  "rain_output": "Heavy Rain",
  "distance_cm": 18.5,
  "status": "Warning",
  "date": "2024-01-21",
  "time": "10:35:22"
}
```
```json
{
  "tempC": 29.8,
  "humidity": 80,
  "rain": 2000,
  "rain_output": "Heavy Rain",
  "distance_cm": 20.7,
  "status": "Warning",
  "date": "2024-01-21",
  "time": "10:37:54"
}
```
3. DANGER Status (rain ≥ 2495 OR distance_cm > 30)
```json
{
  "tempC": 32.5,
  "humidity": 85,
  "rain": 2495,
  "rain_output": "Heavy Rain",
  "distance_cm": 32.1,
  "status": "Danger",
  "date": "2024-01-21",
  "time": "10:40:11"
}
```
```json
{
  "tempC": 31.9,
  "humidity": 88,
  "rain": 3000,
  "rain_output": "Heavy Rain",
  "distance_cm": 35.5,
  "status": "Danger",
  "date": "2024-01-21",
  "time": "10:42:33"
}
```

## Thresholds

### i) distance_cm:
- Safe range: 0 – 15 cm
- Warning range: > 15 cm – 30 cm
- Danger range: > 30 cm

### ii) tempC:
### ii) tempC:
- Note: This value is not used in the application to determine status, so you can put any value.
- below is just a sample value that you can use
- Safe range: 25°C – 35°C (typical environment range)
- Warning range: Any value outside typical environment range
- Danger range: Extreme values (e.g., < 20°C or > 40°C)

### iii) humidity:
- Note: This value is not used in the application to determine status, so you can put any value.
- below is just a sample value that you can use
- Safe range: 50 – 90 (typical environment range)
- Warning range: Any value slightly outside typical range
- Danger range: Extreme values (e.g., < 30 or > 95)

### iv) status:
- Safe
- Warning
- Danger

