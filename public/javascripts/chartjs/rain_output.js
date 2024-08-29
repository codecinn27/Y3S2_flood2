document.addEventListener("DOMContentLoaded", function() {
    var ctx = document.getElementById('rain').getContext('2d');
    var rainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{ 
                data: [],
                label: "Rain Level",
                borderColor: "rgb(255,165,0)",
                backgroundColor:"rgba(255,165,0,0.1)",
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
                        text: "Rain Level",
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

    function updaterainChart(newValue) {
        if (rainChart) { // Check if rainChart is defined
            const newLabel = new Date().toLocaleTimeString(); // Get current time as label
            rainChart.data.labels.push(newLabel);
            rainChart.data.datasets[0].data.push(newValue);
            console.log(`Added new value: ${newValue} cm`); // Log the new value being added
            
            // Remove the oldest label and data point if we exceed 100 points
            if (rainChart.data.labels.length > 100) {
                rainChart.data.labels.shift();
                rainChart.data.datasets[0].data.shift();
            }

            // Update the chart
            rainChart.update();
        }        
    }

    const socket = io();

    socket.on('mqtt-message', (data) => {
        console.log('Received MQTT message:', data); // Log the received message
        
        try {
            // Parse the JSON string in data.message
            const parsedMessage = JSON.parse(data.message);
            const newValue = parseFloat(parsedMessage.rain);
            console.log('Parsed rain:', newValue); // Log the parsed rain value
            
            if (!isNaN(newValue)) {
                updaterainChart(newValue);
            } else {
                console.error('Invalid value for distance_cm:', parsedMessage.rain);
            }
        } catch (e) {
            console.error('Failed to parse message:', data.message);
        }
    });
});
