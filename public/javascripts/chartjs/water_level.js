document.addEventListener("DOMContentLoaded", function() {
    var ctx = document.getElementById('water_level').getContext('2d');
    var waterLevelChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{ 
                data: [],
                label: "Water Level",
                borderColor: "rgb(62,149,205)",
                backgroundColor: "rgba(62,149,205,0.1)",
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
                        text: "Water Level (cm)",
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

    function updateWaterLevelChart(newValue) {
        if (waterLevelChart) { // Check if waterLevelChart is defined
            const newLabel = new Date().toLocaleTimeString(); // Get current time as label
            waterLevelChart.data.labels.push(newLabel);
            waterLevelChart.data.datasets[0].data.push(newValue);
            console.log(`Added new value: ${newValue} cm`); // Log the new value being added
            
            // Remove the oldest label and data point if we exceed 100 points
            if (waterLevelChart.data.labels.length > 100) {
                waterLevelChart.data.labels.shift();
                waterLevelChart.data.datasets[0].data.shift();
            }

            // Update the chart
            waterLevelChart.update();
        }        
    }

    const socket = io();

    socket.on('mqtt-message', (data) => {
        console.log('Received MQTT message:', data); // Log the received message
        
        try {
            // Parse the JSON string in data.message
            const parsedMessage = JSON.parse(data.message);
            const newValue = parseFloat(parsedMessage.distance_cm);
            console.log('Parsed distance_cm:', newValue); // Log the parsed distance_cm value
            
            if (!isNaN(newValue)) {
                updateWaterLevelChart(newValue);
            } else {
                console.error('Invalid value for distance_cm:', parsedMessage.distance_cm);
            }
        } catch (e) {
            console.error('Failed to parse message:', data.message);
        }
    });
});
