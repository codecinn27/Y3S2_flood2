var spark_humidity = {
    chart: {
        id: 'sparkline3',
        group: 'sparklines3',
        type: 'area',
        height: 160,
        sparkline: {
            enabled: true
        },
    },
    colors: ['#C68FE6'],
    animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
            speed: 200
        }
    },
    stroke: {
        curve: 'straight',
        width: 2
    },
    fill: {
        opacity: 1,
    },
    series: [{
        name: 'Humidity Level',
        data: [],
    }],
    labels: [],
    yaxis: {
        min: 0
    },
    title: {
        text: '0 %',
        offsetX: 30,
        style: {
            fontSize: '24px',
            cssClass: 'apexcharts-yaxis-title'
        }
    },
    subtitle: {
        text: 'Humidity Monitoring in %',
        offsetX: 30,
        style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-title'
        }
    }
}

var chart_humidity = new ApexCharts(document.querySelector("#spark_humidity"), spark_humidity);
chart_humidity.render();

// var chart_humidity = new ApexCharts(document.querySelector("#spark_humidity"), {
//     series: [{ data: [] }],
//     chart: { type: 'line' },
//     xaxis: { categories: [] }
// });