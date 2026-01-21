
### Production link: 
https://floodzte5g.azurewebsites.net/
https://floodzte5g.azurewebsites.net/test
https://floodzte5g.azurewebsites.net/ayerkeroh

### How to setup in local

#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- HiveMQ MQTT Broker credentials (free tier)
- Telegram Bot Token (for alerts)

#### Step 1: Clone and Install Dependencies
```bash
# Clone the repository
git clone https://github.com/codecinn27/Y3S2_flood2.git
cd Y3S2_flood2

# Install dependencies
npm install
```

#### Step 2: Configure Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your configuration
```

**Required Environment Variables:**
- `MONGO_URL`: MongoDB connection string (e.g., `mongodb://localhost:27017/flood_db`)
- `BROKER_URL`: HiveMQ broker URL (e.g., `mqtt://your-broker.hivemq.cloud`)
- `BROKER_USERNAME1`: MQTT username for device 1
- `BROKER_PASS1`: MQTT password for device 1
- `BROKER_USERNAME2`: MQTT username for device 2 (optional)
- `BROKER_PASS2`: MQTT password for device 2 (optional)
- `TEST_TOPIC`: MQTT topic prefix (e.g., `zteFlood/flood/melaka/`)
- `DURIAN_TUNGGAL_FLOOD_MODULE`: Device 1 topic (e.g., `zteFlood/flood/melaka/duriantunggal`)
- `AYER_KEROH_FLOOD_MODULE`: Device 2 topic (e.g., `zteFlood/flood/melaka/ayerkeroh`)
- `AYER_KEROH_SLUICE_GATE`: Sluice gate control topic

#### Step 3: Start MongoDB
```bash
# For local MongoDB
mongod
```

#### Step 4: Verify Configuration
Ensure your `.env` file is correctly configured with valid credentials for:
- MongoDB connection
- HiveMQ MQTT broker access
- Device topics

### Command to run 

#### Development Mode (with auto-reload)
```bash
npm run dev
```
This will use `nodemon` to automatically restart the server when files change.

#### Production Mode
```bash
npm start
```

#### Access the Application
- **Main Application**: http://localhost:3000
- **Dev Dashboard**: http://localhost:3000/dev
- **Test Page**: http://localhost:3000/test
- **Ayer Keroh Dashboard**: http://localhost:3000/ayerkeroh

### Project Architecture
Frontend: Javascript, ChartJs
Backend: Nodejs
MQTT: Hivemq (free tier)
Alert: Telegram API
Deployment: Vercel


#### Dashboard Monitoring
- **Real-time Charts**: Water level, temperature, humidity, and rainfall monitoring
- **Status Indicators**: 
  - 🟢 **Safe**: rain < 1495 AND distance_cm ≤ 15
  - 🟡 **Warning**: rain ≥ 1495 OR distance_cm > 15
  - 🔴 **Danger**: rain ≥ 2495 OR distance_cm > 30
- **Sluice Gate Control**: Manual control for danger/warning situations
- **Telegram Alerts**: Automated alerts sent to Telegram on status changes

#### Multiple Device Support
- Durian Tunggal flood monitoring station
- Ayer Keroh flood monitoring station
- Expandable for additional locations

### Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | JavaScript, Chart.js, ApexCharts, EJS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Real-time** | Socket.IO |
| **IoT Communication** | MQTT (HiveMQ) |
| **Notifications** | Telegram API |
| **Deployment** | Azure Web Apps |

### MQTT Data Format

The system expects sensor data in the following JSON format:
```json
{
  "distance_cm": 29.22,
  "tempC": 28.5,
  "humidity": 65.2,
  "rain": 1500,
  "status": "Normal",
  "date": "2024-01-21",
  "time": "00:04:11"
}
```

### Guide on using MQTT client to send dummy data to the application
[Guide on using MQTT client to send dummy data](docs/mqtt_guide.md)

### Guide on using python script to insert dummy data automatically
[Guide on using python to send MQTT dummy data](docs/dummy_data_with_python.md)

### Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running and `MONGO_URL` is correctly configured

**MQTT Connection Failed**
- Verify HiveMQ credentials in `.env`
- Check internet connectivity
- Ensure topic format matches configuration

**Charts Not Updating**
- Confirm MQTT messages are being published to the correct topic
- Check browser console for Socket.IO connection errors
- Verify data payload matches the required JSON format
