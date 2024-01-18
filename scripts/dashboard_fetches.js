document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/dashboard-data', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
        }
    })
    .then(response => response.json())
    .then(data => {
        createBarChart(data.barChartData);
        createLineChart(data.lineChartData);
    })
    .catch(error => console.error('Error:', error));
});

function createBarChart(data) {
    const ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels, // Example: ['January', 'February', 'March']
            datasets: [{
                label: 'Bar Chart',
                data: data.values, // Example: [20, 30, 40]
                backgroundColor: ['red', 'blue', 'green']
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createLineChart(data) {
    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels, // Example: ['Monday', 'Tuesday', 'Wednesday']
            datasets: [{
                label: 'Line Chart',
                data: data.values, // Example: [5, 10, 15]
                borderColor: 'orange',
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
