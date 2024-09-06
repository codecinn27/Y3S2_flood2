var colorPalette = ['#FEB019', '#FF4560']
        var optionsBar = {
            chart: {
                type: 'bar',
                height: 300,
                width: '100%',
                stacked: true,
            },
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                }
            },
            colors: colorPalette,
            series: [{
                name: "Light Rain",
                data: [],
            }, {
                name: "Heavy Rain",
                data: [],
            }],
            xaxis: {
                categories: [],
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: true
                },
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        colors: '#78909c'
                    }
                }
            },
            dataLabels: {
                enabled: false  // Disable the data labels on the bars
            },
            title: {
                text: 'Rain Value',
                align: 'left',
                style: {
                    fontSize: '18px'
                }
            }

        }

        var chartBar = new ApexCharts(document.querySelector('#rain_bar'), optionsBar);
        chartBar.render();

        // var chartBar = new ApexCharts(document.querySelector("#rain_bar"), {
        //     series: [{ data: [] }, { data: [] }],
        //     chart: { type: 'bar' },
        //     xaxis: { categories: [] }
        // });