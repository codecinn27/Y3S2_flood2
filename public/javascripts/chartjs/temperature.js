document.addEventListener("DOMContentLoaded", function() {
    var ctx = document.getElementById('tempC').getContext('2d');
    var tempChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{ 
                data: [],
                label: "Temperature",
                borderColor: "rgb(196,88,80)",
                backgroundColor:"rgba(196,88,80,0.1)",
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
                        text: "Temperature",
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

    function updatetempChart(newValue) {
        if (tempChart) { // Check if tempChart is defined
            const newLabel = new Date().toLocaleTimeString(); // Get current time as label
            tempChart.data.labels.push(newLabel);
            tempChart.data.datasets[0].data.push(newValue);
            console.log(`Added new value: ${newValue} *C`); // Log the new value being added
            
            // Remove the oldest label and data point if we exceed 100 points
            if (tempChart.data.labels.length > 100) {
                tempChart.data.labels.shift();
                tempChart.data.datasets[0].data.shift();
            }

            // Update the chart
            tempChart.update();
        }        
    }

    const socket = io();

    socket.on('mqtt-message', (data) => {
        console.log('Received MQTT message:', data); // Log the received message
        
        try {
            // Parse the JSON string in data.message
            const parsedMessage = JSON.parse(data.message);
            const newValue = parseFloat(parsedMessage.tempC);
            console.log('Parsed *C:', newValue); // Log the parsed humidity value
            
            if (!isNaN(newValue)) {
                updatetempChart(newValue);
            } else {
                console.error('Invalid value for distance_cm:', parsedMessage.tempC);
            }
        } catch (e) {
            console.error('Failed to parse message:', data.message);
        }
    });
});
