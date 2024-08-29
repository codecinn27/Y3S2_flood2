document.addEventListener("DOMContentLoaded", function() {
    var ctx = document.getElementById('humidity').getContext('2d');
    var humidityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{ 
                data: [],
                label: "Humidty",
                borderColor: "rgb(60,186,159)",
                backgroundColor: "rgba(60,186,159,0.1)",
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "DateTime",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Humidity",
                    },
                    beginAtZero: true, // Ensure y-axis starts at zero
                },
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy',
                    },
                    zoom: {
                        enabled: true,
                        mode: 'xy',
                        speed: 0.1, // Adjust zoom speed
                    },
                },
            },
        },
    });

    function updateHumidityChart(newValue) {
        if (humidityChart) { // Check if humidityChart is defined
            const newLabel = new Date().toLocaleTimeString(); // Get current time as label
            humidityChart.data.labels.push(newLabel);
            humidityChart.data.datasets[0].data.push(newValue);
            console.log(`Added new value: ${newValue} cm`); // Log the new value being added
            
            // Remove the oldest label and data point if we exceed 100 points
            if (humidityChart.data.labels.length > 100) {
                humidityChart.data.labels.shift();
                humidityChart.data.datasets[0].data.shift();
            }

            // Update the chart
            humidityChart.update();
        }        
    }

    const socket = io();

    socket.on('mqtt-message', (data) => {
        console.log('Received MQTT message:', data); // Log the received message
        
        try {
            // Parse the JSON string in data.message
            const parsedMessage = JSON.parse(data.message);
            const newValue = parseFloat(parsedMessage.humidity);
            console.log('Parsed distance_cm:', newValue); // Log the parsed humidity value
            
            if (!isNaN(newValue)) {
                updateHumidityChart(newValue);
            } else {
                console.error('Invalid value for distance_cm:', parsedMessage.humidity);
            }
        } catch (e) {
            console.error('Failed to parse message:', data.message);
        }
    });
});
