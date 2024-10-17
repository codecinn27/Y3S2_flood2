// Function to populate charts with the last 24 data points from MongoDB (data2)
// function populateCharts(data2) {
//     // Initialize arrays to hold the data for each chart
//     let waterSeriesData = [];
//     let tempSeriesData = [];
//     let humiditySeriesData = [];
//     let lightRainSeries = [];
//     let heavyRainSeries = [];
//     let categories = [];

//     // Iterate over data2 and populate arrays with values
//     data2.forEach(entry => {
//         // let datetime = `${entry.date} ${entry.time}`;

//         // waterSeriesData.push({ x: new Date(datetime), y: entry.distance });
//         // tempSeriesData.push({ x: new Date(datetime), y: entry.tempC });
//         // humiditySeriesData.push({ x: new Date(datetime), y: entry.humidity });
//         let datetime = new Date(new Date(entry.mongoDBtime).getTime() - (8 * 60 * 60 * 1000));
//         waterSeriesData.push({ x: datetime, y: entry.distance });
//         tempSeriesData.push({ x: datetime, y: entry.tempC });
//         humiditySeriesData.push({ x: datetime, y: entry.humidity });


//         // Rain data logic (light rain capped at 1200, remainder goes to heavy rain)
//         if (entry.rain > 1200) {
//             lightRainSeries.push(1200);  // Light Rain is capped at 1200
//             heavyRainSeries.push(entry.rain - 1200);  // The rest goes to Heavy Rain
//         } else {
//             lightRainSeries.push(entry.rain);
//             heavyRainSeries.push(0);  // No Heavy Rain if less than 30
//         }

//         // Add the new datetime to the categories
//         categories.push(datetime);
//     });

//     // Update the charts with the populated data
//     chart_water.updateSeries([{ data: waterSeriesData }], true);
//     chart_temp.updateSeries([{ data: tempSeriesData }], true);
//     chart_humidity.updateSeries([{ data: humiditySeriesData }], true);

//     // Update the rain bar chart
//     chartBar.updateSeries([
//         { data: lightRainSeries },
//         { data: heavyRainSeries }
//     ], true);

//     chartBar.updateOptions({
//         xaxis: {
//             categories: categories
//         }
//     });

//     // Update the titles of the sparkline charts with the latest values from data2
//     const lastEntry = data2[data2.length - 1];  // Get the latest (last) data point
//     chart_water.updateOptions({
//         title: {
//             text: `${lastEntry.distance} cm`
//         }
//     });
//     chart_temp.updateOptions({
//         title: {
//             text: `${lastEntry.tempC} °C`
//         }
//     });
//     chart_humidity.updateOptions({
//         title: {
//             text: `${lastEntry.humidity} %`
//         }
//     });
// }

// function lastStatus(data2){
//     const lastData = data2[data2.length - 1]; // Get the last data entry
//     document.getElementById('status').innerText = `Status: ${lastData.status}`;
    
// }


// // Call the function to populate the charts with data2 on page load
// populateCharts(data2);

function populateCharts(data2) {
    // Sort the data in descending order based on mongoDBtime
    data2.sort((b, a) => new Date(b.mongoDBtime) - new Date(a.mongoDBtime));

    // Initialize arrays to hold the data for each chart
    let waterSeriesData = [];
    let tempSeriesData = [];
    let humiditySeriesData = [];
    let lightRainSeries = [];
    let heavyRainSeries = [];
    let categories = [];

    // Iterate over data2 and populate arrays with values
    data2.forEach(entry => {
        let datetime = new Date(new Date(entry.mongoDBtime).getTime() - (8 * 60 * 60 * 1000));
        waterSeriesData.push({ x: datetime, y: entry.distance });
        tempSeriesData.push({ x: datetime, y: entry.tempC });
        humiditySeriesData.push({ x: datetime, y: entry.humidity });

        // Rain data logic (light rain capped at 1200, remainder goes to heavy rain)
        if (entry.rain > 1200) {
            lightRainSeries.push(1200);  // Light Rain is capped at 1200
            heavyRainSeries.push(entry.rain - 1200);  // The rest goes to Heavy Rain
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
    const lastEntry = data2[0];  // Get the latest (first) data point in sorted array
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

function lastStatus(data2) {
    const lastData = data2[0]; // Get the last (first) data entry in sorted array
    document.getElementById('status').innerText = `Status: ${lastData.status}`;
}

// Call the function to populate the charts with data2 on page load
populateCharts(data2);

lastStatus(dataStatus);