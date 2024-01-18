// script.js

document.addEventListener('DOMContentLoaded', function () {
    const csvFilePath = 'data.csv';
    loadCSVAndDrawChart(csvFilePath);
});

function loadCSVAndDrawChart(csvFilePath) {
    fetch(csvFilePath)
        .then(response => response.text())
        .then(data => {
            const dataArray = processData(data);
            drawChart(dataArray);
        });
}

function processData(csvData) {
    const rows = csvData.split('\n');
    const dataArray = [];

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        dataArray.push({
            year: row[0],
            country: row[1],
            gold: parseInt(row[2]),
            silver: parseInt(row[3]),
            bronze: parseInt(row[4])
        });
    }

    return dataArray;
}

function drawChart(dataArray) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const years = Array.from(new Set(dataArray.map(data => data.year)));
    const countries = Array.from(new Set(dataArray.map(data => data.country)));

    const datasets = countries.map(country => {
        return {
            label: country,
            data: years.map(year => {
                const dataPoint = dataArray.find(data => data.country === country && data.year === year);
                return dataPoint ? dataPoint.gold + dataPoint.silver + dataPoint.bronze : 0;
            }),
            backgroundColor: getRandomColor()
        };
    });

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: true
                },
                x: {
                    stacked: true
                }
            }
        }
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}