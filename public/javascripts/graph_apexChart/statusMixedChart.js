//https://apexcharts.com/javascript-chart-demos/mixed-charts/line-column-area/
// rain output (area line) and status (bar)
function convertToMalaysiaTime(utcDateString) {
  let utcDate = new Date(utcDateString);
  let malaysiaTime = new Date(utcDate.getTime() + (8 * 60 * 60 * 1000)); // Malaysia is UTC+8
  return malaysiaTime.toISOString().slice(0, 19).replace('T', ' ');
}

function transformData(data2) {
  return {
    series: [
      {
        name: 'Status',
        type: 'column',
        data: data2.map(item => ({
          x: convertToMalaysiaTime(item.mongoDBtime),
          // x: item.date + ' ' + item.time,
          y: item.status === 'Safe' ? 0 : item.status === 'Warning' ? 50 : item.status === 'Danger' ? 100 : null
        }))
      },
      {
        name: 'Rain Output',
        type: 'area',
        data: data2.map(item => ({
          x: convertToMalaysiaTime(item.mongoDBtime),
          // x: item.date + ' ' + item.time,
          y: item.rain
        }))
      }
    ]
  }  
};

const transformedData = transformData(data2);
const last20Data = transformedData.series[0].data.slice(20);
const minTime = new Date(last20Data[0].x).getTime();
const maxTime = new Date(last20Data[last20Data.length - 1].x).getTime();

var options = {
  series: transformedData.series,
  chart: {
    height: 350,
    type: 'line',
    stacked: false,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    }
  },
  stroke: {
    width: [0, 2],
    curve: 'smooth'
  },
  title: {
    text: 'Rain output, Status (0: Safe, 50: warning, 100: danger)',
    align: 'left',
    style: {
      fontSize: '14px'
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },

  fill: {
    opacity: [0.85, 0.25],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100]
    }
  },

  markers: {
    size: 0
  },
  xaxis: {
    type: 'datetime',
    min: minTime,
    max: maxTime,
    tickAmount: 20 // Adjust this to control the number of ticks on the x-axis
  },
  yaxis:[
    {
      title: {
        text: 'Status',
        min: 0,
        max: 100,
        
      }
    },
    {
      opposite: true,
      title: {
        text: 'Rain Output',
      }
    }
  ],
  tooltip: {
    shared: true,
    intersect: false,
    x: {
      format: "yyyy-MM-dd HH:mm",
    },
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " points";
        }
        return y;

      }
    }
  }
};

var chart = new ApexCharts(document.querySelector("#statusChart"), options);
chart.render();