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
            country: row[0],
            gold: parseInt(row[1]),
            silver: parseInt(row[2]),
            bronze: parseInt(row[3])
        });
    }

    return dataArray;
}

function drawChart(dataArray) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const countries = dataArray.map(data => data.country);

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: countries,
            datasets: [
                {
                    label: 'Gold',
                    data: dataArray.map(data => data.gold),
                    backgroundColor: 'gold'
                },
                {
                    label: 'Silver',
                    data: dataArray.map(data => data.silver),
                    backgroundColor: 'silver'
                },
                {
                    label: 'Bronze',
                    data: dataArray.map(data => data.bronze),
                    backgroundColor: 'peru'
                }
            ]
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
