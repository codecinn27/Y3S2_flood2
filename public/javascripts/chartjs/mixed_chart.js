
document.addEventListener("DOMContentLoaded", function() {

    var ctx = document.getElementById('mixed_chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [new Date().toLocaleTimeString()], // Initial x-axis label set to the current date
            datasets: [
                { 
                    data: [0], // Initial data for distance_cm
                    label: "Water Level (cm)",
                    borderColor: "#3e95cd",
                    backgroundColor: "rgb(62,149,205)",
                    borderWidth: 2,
                    type: 'bar'
                },
                { 
                    data: [0], // Initial data for rain
                    label: "Rain (mm)",
                    borderColor: "#ffa500",
                    backgroundColor: "#ffa500",
                    borderWidth: 2,
                    type: 'bar'
                },
                { 
                    data: [0], // Initial data for tempC
                    label: "Temperature (°C)",
                    borderColor: "#c45850",
                    backgroundColor: "#c45850",
                    borderWidth: 2,
                    type: 'line',
                    fill: false
                },
                { 
                    data: [{ x: new Date().toLocaleTimeString(), y: 0 }], // Initial data for humidity in bubble chart
                    label: "Humidity",
                    borderColor: "#3cba9f",
                    backgroundColor: "#3cba9f",
                    borderWidth: 2,
                    type: 'bubble',
                    pointBackgroundColor: "#3cba9f",
                    pointRadius: 10 // Example radius for bubbles
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "DateTime",
                    },
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function updateMixChart(humidity, tempC, rain, distance_cm) {
        const currentDate = new Date().toLocaleTimeString();
        // Update the labels (x-axis) with the current date
         myChart.data.labels.push(currentDate);

        // Update bar datasets (distance_cm and rain)
        myChart.data.datasets[0].data.push(distance_cm);
        myChart.data.datasets[1].data.push(rain);

        // Update line dataset (tempC)
        myChart.data.datasets[2].data.push(tempC);

        // Update bubble dataset (humidity)
        myChart.data.datasets[3].data.push({ x: currentDate, y: humidity });

       

        // Update the chart
        myChart.update();
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
                updateMixChart(humidity, tempC, rain, distance_cm);
            } else {
                console.error('Invalid sensor values:', parsedMessage);
            }
        } catch (e) {
            console.error('Failed to parse message:', data.message);
        }
    });
});
