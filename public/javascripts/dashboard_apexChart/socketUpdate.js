const socket = io();
function updateCharts(newData) {
    // Extract the current series data and labels for each chart
    let waterSeriesData = chart_water.w.config.series[0].data;
    let tempSeriesData = chart_temp.w.config.series[0].data;
    let humiditySeriesData = chart_humidity.w.config.series[0].data;
    let label_water = chart_water.w.config.labels;
    let label_temp = chart_temp.w.config.labels;
    let label_humidity = chart_humidity.w.config.labels;
    //bar rain
    let lightRainSeries = chartBar.w.config.series[0].data;
    let heavyRainSeries = chartBar.w.config.series[1].data;
    let categories = chartBar.w.config.xaxis.categories;

    // Combine date and time to form a datetime string
    let datetime = `${newData.date} ${newData.time}`;

    // Add new data points with datetime labels
    waterSeriesData.push({ x: new Date(datetime), y: newData.distance_cm });
    tempSeriesData.push({ x: new Date(datetime), y: newData.tempC });
    humiditySeriesData.push({ x: new Date(datetime), y: newData.humidity });

    // Determine if the new data falls into Light Rain or Heavy Rain
    if (newData.rain > 1200) {
        lightRainSeries.push(1200);  // Light Rain is capped at 1200
        heavyRainSeries.push(newData.rain - 1200); // The rest goes to Heavy Rain
    } else {
        lightRainSeries.push(newData.rain);
        heavyRainSeries.push(0); // No Heavy Rain if less than 1200
    }

    // Add the new datetime to the categories
    categories.push(datetime);

    // Limit data points to the last 24 (or any other limit you prefer)
    if (waterSeriesData.length > 24) {
        waterSeriesData.shift();
        tempSeriesData.shift();
        humiditySeriesData.shift();
        label_water.shift();
        label_temp.shift();
        label_humidity.shift();
    }

    // Limit data points to the last 24 for each series and labels
    if (lightRainSeries.length > 24) {
        lightRainSeries.shift();
    }
    if (heavyRainSeries.length > 24) {
        heavyRainSeries.shift();
    }
    if (categories.length > 24) {
        categories.shift();
    }

    // Update the charts with new data and labels
    chart_water.updateSeries([{ data: waterSeriesData }], true); // true for smooth transition
    chart_temp.updateSeries([{ data: tempSeriesData }], true);
    chart_humidity.updateSeries([{ data: humiditySeriesData }], true);
    // Update the bar chart with new series data and categories (x-axis labels)
    chartBar.updateSeries([
        { data: lightRainSeries },
        { data: heavyRainSeries }
    ], true); // true for smooth transition

    chartBar.updateOptions({
        xaxis: {
            categories: categories
        }
    });

    // Update titles with the latest values
    chart_water.updateOptions({
        title: {
            text: `${newData.distance_cm} cm`
        }
    });
    chart_temp.updateOptions({
        title: {
            text: `${newData.tempC} °C`
        }
    });
    chart_humidity.updateOptions({
        title: {
            text: `${newData.humidity} %`
        }
    });
}

function updateStatus(newData) {
    const statusElement = document.getElementById('status');
    const statusBoxElement = document.getElementById('statusBox');
    const sluiceGateButton = document.getElementById('sluiceGateButton');

    // Update the status text
    statusElement.innerText = `Status: ${newData.status}`;

    // Remove existing gradient classes
    statusBoxElement.classList.remove(
        'bg-gradient-to-r', 'from-[#e52d27]', 'to-[#b31217]', 'hover:bg-gradient-to-bl', 'focus:ring-red-100', 'dark:focus:ring-red-400',
        'from-[#fceabb]', 'to-[#f8b500]', 'focus:ring-yellow-100', 'dark:focus:ring-yellow-400',
        'from-teal-200', 'to-lime-200', 'focus:ring-lime-200', 'dark:focus:ring-teal-700'
    );

    // Add new gradient classes based on status
    if (newData.status === 'Danger') {
        statusBoxElement.classList.add('bg-gradient-to-r', 'from-[#e52d27]', 'to-[#b31217]', 'hover:bg-gradient-to-bl', 'focus:ring-red-100', 'dark:focus:ring-red-400');
        sluiceGateButton.style.display = 'inline-block';
    } else if (newData.status === 'Warning') {
        statusBoxElement.classList.add('bg-gradient-to-r', 'from-[#fceabb]', 'to-[#f8b500]', 'hover:bg-gradient-to-bl', 'focus:ring-yellow-100', 'dark:focus:ring-yellow-400');
        sluiceGateButton.style.display = 'inline-block';
    } else {
        statusBoxElement.classList.add('bg-gradient-to-r', 'from-teal-200', 'to-lime-200', 'hover:bg-gradient-to-l', 'focus:ring-lime-200', 'dark:focus:ring-teal-700');
        sluiceGateButton.style.display = 'none';
    }

}
socket.on('mqtt-message', (data3) => {
    if(data3.topic === `zteFlood/flood/melaka/${data.id}`){
        const messageData = JSON.parse(data3.message);

        // Example format of messageData:
        // { distance_cm: 29.22, tempC: 28.5, humidity: 65.2, date: '2024-09-03', time: '00:04:11' }
    
        updateCharts(messageData);
        updateStatus(messageData);
    }
});