// https://apexcharts.com/javascript-chart-demos/area-charts/negative/
// humidity, temperature, wtaer level
// Ensure that data2 is available as a global variable

// Function to transform data2 into the format expected by ApexCharts
function transformData(data2) {
  return {
    series: [
      {
        name: 'Water Level (cm)',
        data: data2.map(item => ({
          x: item.date + ' ' + item.time,
          y: item.distance
        }))
      },
      {
        name: 'Temperature (°C)',
        data: data2.map(item => ({
          x: item.date + ' ' + item.time,
          y: item.tempC
        }))
      },
      {
        name: 'Humidity (%)',
        data: data2.map(item => ({
          x: item.date + ' ' + item.time,
          y: item.humidity
        }))
      }
    ]
  };
}

var options = {
  series: transformData(data2).series,
  chart: {
    type: 'area',
    height: 350
  },
  colors: ['#478CCF', '#FF4C4C', '#77E4C8'], // Added colors here
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Water Level, Temperature, Humidity',
    align: 'left',
    style: {
      fontSize: '14px',
      
    }
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    tickAmount: 4,
    floating: false,
    max: 100, // Set the maximum value for the y-axis
    labels: {
      style: {
        colors: '#8e8da4',
      },
      offsetY: -7,
      offsetX: 0,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false
    }
  },
  fill: {
    opacity: 0.5
  },
  tooltip: {
    x: {
      format: "yyyy-MM-dd HH:mm",
    },
    fixed: {
      enabled: false,
      position: 'topRight'
    }
  },
  grid: {
    yaxis: {
      lines: {
        offsetX: -30
      }
    },
    padding: {
      left: 20
    }
  }
};

var chart = new ApexCharts(document.querySelector("#lineChart"), options);
chart.render();
