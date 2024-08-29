var ctx = document.getElementById('bar_chart3').getContext('2d');
var barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Humidity", "Temperature (°C)", "Rain (mm)", "Water Level (cm)"], // X-axis labels
        datasets: [
            {
                label: "Humidity",
                data: [0, 0, 0, 0], // Data only for "Humidity" label
                backgroundColor: 'rgba(60,186,159,0.7)',
                borderColor: 'rgba(60,186,159,1)',
                borderWidth: 3
            },
            {
                label: "Temperature (°C)",
                data: [null, 0, null, null], // Data only for "Temperature (°C)" label
                backgroundColor: 'rgba(62,149,205,0.7)',
                borderColor: 'rgba(62,149,205,1)',
                borderWidth: 3
            },
            {
                label: "Rain (mm)",
                data: [null, null, 0, null], // Data only for "Rain (mm)" label
                backgroundColor: 'rgba(255,165,0,0.7)',
                borderColor: 'rgba(255,165,0,1)',
                borderWidth: 3
            },
            {
                label: "Water Level (cm)",
                data: [null, null, null, 0], // Data only for "Water Level (cm)" label
                backgroundColor: 'rgba(196,88,80,0.7)',
                borderColor: 'rgba(196,88,80,1)',
                borderWidth: 3
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true,
                onClick: function(e, legendItem) {
                    var index = legendItem.datasetIndex;
                    var ci = this.chart;
                    var meta = ci.getDatasetMeta(index);

                    // Toggle the visibility
                    meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

                    // Update the chart
                    ci.update();
                }
            }
        }
    }
});

function updateBarChart(humidity, tempC, rain, distance_cm) {
    barChart.data.datasets[0].data = [humidity, tempC, rain, distance_cm];
    barChart.data.datasets[1].data = [humidity, tempC, rain, distance_cm];
    barChart.data.datasets[2].data = [humidity, tempC, rain, distance_cm];
    barChart.data.datasets[3].data = [humidity, tempC, rain, distance_cm];
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
