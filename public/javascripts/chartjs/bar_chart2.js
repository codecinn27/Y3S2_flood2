document.addEventListener("DOMContentLoaded", function() {
    var ctx = document.getElementById('bar_chart2').getContext('2d');
    var barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Humidity", "Temperature (°C)", "Rain (mm)", "Water Level (cm)"],
            datasets: [{
                label: 'Sensor Data',
                data: [0, 0, 0, 0], // Initial data values set to 0
                backgroundColor: [
                    'rgba(60,186,159,0.7)', // Humidity
                    'rgba(62,149,205,0.7)', // Temperature
                    'rgba(255,165,0,0.7)',  // Rain
                    'rgba(196,88,80,0.7)'   // Water Level
                ],
                borderColor: [
                    'rgba(60,186,159,1)',
                    'rgba(62,149,205,1)',
                    'rgba(255,165,0,1)',
                    'rgba(196,88,80,1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            
        }
    });

    function updateBarChart(humidity, tempC, rain, distance_cm) {
        barChart.data.datasets[0].data = [humidity, tempC, rain, distance_cm];
        barChart.update();
    }

    const socket = io();

    socket.on('mqtt-message', (data) => {
        console.log('Received MQTT message:', data); // Log the received message
        
        try {
            const parsedMessage = JSON.parse(data.message);
            const humidity = parseFloat(parsedMessage.humidity);
            const tempC = parseFloat(parsedMessage.tempC);
            const rain = parseFloat(parsedMessage.rain);
            const distance_cm = parseFloat(parsedMessage.distance_cm);

            if (!isNaN(humidity) && !isNaN(tempC) && !isNaN(rain) && !isNaN(distance_cm)) {
                updateBarChart(humidity, tempC, rain, distance_cm);
            } else {
                console.error('Invalid sensor values:', parsedMessage);
            }
        } catch (e) {
            console.error('Failed to parse message:', data.message);
        }
    });
});