const baseColors = ['#7d9bab', '#3A4B5C', '#051933'];
function adjustColor(color, percent) {
    let R = parseInt(color.substring(1,3), 16);
    let G = parseInt(color.substring(3,5), 16);
    let B = parseInt(color.substring(5,7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}
function generateRandomBackgroundColors(baseColors, numberOfColors) {
    let backgroundColors = [];
    for (let i = 0; i < numberOfColors; i++) {
        // Randomly pick a base color
        let baseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
        // Apply a random adjustment
        let adjustedColor = adjustColor(baseColor, Math.floor(Math.random() * 41) - 20); // Adjusts by up to +/- 20%
        backgroundColors.push(adjustedColor);
    }
    return backgroundColors;
}

function createBarChart(data,chart_id,title='Bar Chart') {
    var chartContainer = document.getElementById(`${chart_id}_div`); // Ensure this exists
    if (!chartContainer) {
        console.error('Chart container div not found');
        return; // Exit if the container doesn't exist
    }

    var existingCanvas = document.getElementById(chart_id);
    if (existingCanvas) {
        existingCanvas.remove(); // Remove existing canvas if it exists
    }

    var newCanvas = document.createElement('canvas');
    var newCanvasId = chart_id //+ String(document.querySelectorAll('canvas').length); // Ensure uniqueness
    newCanvas.id = newCanvasId;
    chartContainer.appendChild(newCanvas);

    // Now, get the context of the newly added canvas
    var ctx = document.getElementById(newCanvasId).getContext('2d');
    var chartBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels, // Example: ['January', 'February', 'March']
            datasets: [{
                label: title,
                data: data.values, // Example: [20, 30, 40]
                backgroundColor: generateRandomBackgroundColors(baseColors, data.values.length)
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
    return chartBar
}

function createLineChart(data,chart_id,title='Line Chart') {
    var chartContainer = document.getElementById(`${chart_id}_div`); // Ensure this exists
    if (!chartContainer) {
        console.error('Chart container div not found');
        return; // Exit if the container doesn't exist
    }

    var existingCanvas = document.getElementById(chart_id);
    if (existingCanvas) {
        existingCanvas.remove(); // Remove existing canvas if it exists
    }

    var newCanvas = document.createElement('canvas');
    var newCanvasId = chart_id //+ String(document.querySelectorAll('canvas').length); // Ensure uniqueness
    newCanvas.id = newCanvasId;
    chartContainer.appendChild(newCanvas);

    // Now, get the context of the newly added canvas
    var ctx = document.getElementById(newCanvasId).getContext('2d');
    const chartLine = new Chart(ctx, {
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

function createPieChart(data,chart_id,title='Pie Chart') {
    var chartContainer = document.getElementById(`${chart_id}_div`); // Ensure this exists
    if (!chartContainer) {
        console.error('Chart container div not found');
        return; // Exit if the container doesn't exist
    }

    var existingCanvas = document.getElementById(chart_id);
    if (existingCanvas) {
        existingCanvas.remove(); // Remove existing canvas if it exists
    }

    var newCanvas = document.createElement('canvas');
    var newCanvasId = chart_id //+ String(document.querySelectorAll('canvas').length); // Ensure uniqueness
    newCanvas.id = newCanvasId;
    chartContainer.appendChild(newCanvas);

    // Now, get the context of the newly added canvas
    var ctx = document.getElementById(newCanvasId).getContext('2d');
    var chartPie = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.labels, // Example: ['January', 'February', 'March']
            datasets: [{
                label: title,
                data: data.values, // Example: [20, 30, 40]
                backgroundColor: generateRandomBackgroundColors(baseColors, data.values.length)
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

function createCardChart(data, chartId, title = 'Total Value') {
    var chartContainer = document.getElementById(`${chartId}_div`)
     // Ensure this exists
    if (!chartContainer) {
        console.error('Chart container div not found');
        return; // Exit if the container doesn't exist
    }
    var existingCanvas = document.getElementById(chartId);
    if (existingCanvas) {
        existingCanvas.remove() // Remove existing canvas if it exists
    }
    // Clear any existing content
    chartContainer.innerHTML = '';

    // Create the card elements
    var card = document.createElement('div');
    var cardTitle = document.createElement('div');
    var cardValue = document.createElement('div');

    // Assign classes for styling
    card.id = chartId
    card.className = 'dashboard-card';
    cardTitle.className = 'card-title';
    cardValue.className = 'card-value';

    // Set the content
    cardTitle.textContent = title;
    const totalValue = data.values.reduce((acc, curr) => acc + curr, 0); // Calculate the total
    cardValue.textContent = totalValue.toLocaleString(); // Format the number for readability

    // Append the elements
    card.appendChild(cardTitle);
    card.appendChild(cardValue);
    chartContainer.appendChild(card);

}

function buildBotsSelectConfigElements(data){
    var botsInfo = data
    var selectBotConfig = document.getElementById("bot_select_name");
    for (let row in botsInfo){
        optionBotConfig = document.createElement('option')
        optionBotConfig.innerText = capitalizeString(botsInfo[row].bot_name)
        optionBotConfig.value = botsInfo[row].bot_name
        selectBotConfig.appendChild(optionBotConfig)
    }
}