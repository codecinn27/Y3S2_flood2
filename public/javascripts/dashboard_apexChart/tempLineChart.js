var spark_temp = {
    chart: {
        id: 'sparkline2',
        group: 'sparklines2',
        type: 'area',
        height: 160,
        sparkline: {
            enabled: true
        },
    },
    colors: ['#C7253E'],
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
        name: 'Temperature',
        data: []
    }],
    labels: [],
    yaxis: {
        min: 0
    },
    title: {
        text: '28 °C',
        offsetX: 30,
        style: {
            fontSize: '24px',
            cssClass: 'apexcharts-yaxis-title'
        }
    },
    subtitle: {
        text: 'Temperature Monitoring in °C',
        offsetX: 30,
        style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-title'
        }
    }
}

var chart_temp = new ApexCharts(document.querySelector("#spark_temp"), spark_temp);
chart_temp.render();

// var chart_temp = new ApexCharts(document.querySelector("#spark_temp"), {
//     series: [{ data: [] }],
//     chart: { type: 'line' },
//     xaxis: { categories: [] }
// });