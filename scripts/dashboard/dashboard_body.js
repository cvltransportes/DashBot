function createBarChart(data,chart_id,title='Bar Chart') {
    console.log(data)
    console.log(data.labels)
    console.log(data.values)
    const ctx = document.getElementById(chart_id).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels, // Example: ['January', 'February', 'March']
            datasets: [{
                label: title,
                data: data.values, // Example: [20, 30, 40]
                backgroundColor: ['#7d9bab', '#3A4B5C', '#051933']
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        // Applies to legend labels
                        font: {
                            size: 20 // Increase legend font size
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        // Applies to x-axis tick labels
                        font: {
                            size: 10 // Increase x-axis tick label font size
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        // Applies to y-axis tick labels
                        font: {
                            size: 10 // Increase y-axis tick label font size
                        }
                    }
                }
            }
        }
    });
}

function createLineChart(data,chart_id,title='Line Chart') {
    const ctx = document.getElementById(chart_id).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels, // Example: ['Monday', 'Tuesday', 'Wednesday']
            datasets: [{
                label: title,
                data: data.values, // Example: [5, 10, 15]
                borderColor: '#000',
                fill: false
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        // Applies to legend labels
                        font: {
                            size: 20 // Increase legend font size
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        // Applies to x-axis tick labels
                        font: {
                            size: 10 // Increase x-axis tick label font size
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        // Applies to y-axis tick labels
                        font: {
                            size: 10 // Increase y-axis tick label font size
                        }
                    }
                }
            }
        }
    });
}
