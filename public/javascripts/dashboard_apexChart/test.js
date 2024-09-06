const socket = io();

// Function to populate charts with the last 24 data points from MongoDB (data2)
function populateCharts(data2) {
    // Initialize arrays to hold the data for each chart
    let waterSeriesData = [];
    let tempSeriesData = [];
    let humiditySeriesData = [];
    let lightRainSeries = [];
    let heavyRainSeries = [];
    let categories = [];

    // Iterate over data2 and populate arrays with values
    data2.forEach(entry => {
        let datetime = `${entry.date} ${entry.time}`;

        // Add data for sparkline charts
        waterSeriesData.push({ x: datetime, y: entry.distance_cm });
        tempSeriesData.push({ x: datetime, y: entry.tempC });
        humiditySeriesData.push({ x: datetime, y: entry.humidity });

        // Rain data logic (light rain capped at 30, remainder goes to heavy rain)
        if (entry.rain > 30) {
            lightRainSeries.push(30);  // Light Rain is capped at 30
            heavyRainSeries.push(entry.rain - 30);  // The rest goes to Heavy Rain
        } else {
            lightRainSeries.push(entry.rain);
            heavyRainSeries.push(0);  // No Heavy Rain if less than 30
        }

        // Add the new datetime to the categories
        categories.push(datetime);
    });

    // Update the charts with the populated data
    chart_water.updateSeries([{ data: waterSeriesData }], true);
    chart_temp.updateSeries([{ data: tempSeriesData }], true);
    chart_humidity.updateSeries([{ data: humiditySeriesData }], true);

    // Update the rain bar chart
    chartBar.updateSeries([
        { data: lightRainSeries },
        { data: heavyRainSeries }
    ], true);

    chartBar.updateOptions({
        xaxis: {
            categories: categories
        }
    });

    // Update the titles of the sparkline charts with the latest values from data2
    const lastEntry = data2[data2.length - 1];  // Get the latest (last) data point
    chart_water.updateOptions({
        title: {
            text: `${lastEntry.distance_cm.toFixed(2)} cm`
        }
    });
    chart_temp.updateOptions({
        title: {
            text: `${lastEntry.tempC.toFixed(2)} °C`
        }
    });
    chart_humidity.updateOptions({
        title: {
            text: `${lastEntry.humidity.toFixed(2)} %`
        }
    });
}

// Call the function to populate the charts with data2 on page load
populateCharts(data2);

// Real-time updates from MQTT
socket.on('mqtt-message', (data) => {
    const messageData = JSON.parse(data.message);

    // Example format of messageData:
    // { distance_cm: 29.22, tempC: 28.5, humidity: 65.2, date: '2024-09-03', time: '00:04:11' }

    updateCharts(messageData);
});
