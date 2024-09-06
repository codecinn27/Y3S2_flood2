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

        waterSeriesData.push({ x: new Date(datetime), y: entry.distance });
        tempSeriesData.push({ x: new Date(datetime), y: entry.tempC });
        humiditySeriesData.push({ x: new Date(datetime), y: entry.humidity });

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
            text: `${lastEntry.distance} cm`
        }
    });
    chart_temp.updateOptions({
        title: {
            text: `${lastEntry.tempC} °C`
        }
    });
    chart_humidity.updateOptions({
        title: {
            text: `${lastEntry.humidity} %`
        }
    });
}

// Call the function to populate the charts with data2 on page load
populateCharts(data2);