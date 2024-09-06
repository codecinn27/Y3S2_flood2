var spark_water = {
    chart: {
        id: 'sparkline1',
        group: 'sparklines',
        type: 'area',
        height: 160,
        sparkline: {
            enabled: true
        },
    },
    colors: ['#48CFCB'],
    animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
            speed: 200
        }
    },
    stroke: {
        curve: 'straight'
    },
    fill: {
        opacity: 1,
    },
    series: [{
        name: 'Water Level',
        data: []
    }],
    labels: [],
    yaxis: {
        min: 0
    },
    title: {
        text: '0 cm',
        offsetX: 30,
        style: {
            fontSize: '24px',
            cssClass: 'apexcharts-yaxis-title'
        }
    },
    subtitle: {
        text: 'Water Level Monitoring in cm',
        offsetX: 30,
        style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-title'
        }
    }
}

var chart_water = new ApexCharts(document.querySelector("#spark_water"), spark_water);
chart_water.render();

// var chart_water = new ApexCharts(document.querySelector("#spark_water"), {
//     series: [{ data: [] }],
//     chart: { type: 'line' },
//     xaxis: { categories: [] }
// });