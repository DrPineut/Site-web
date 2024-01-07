var data = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'],
    gelUtilise: [500, 700, 550, 800, 600],
    mainsDetectees: [100, 150, 120, 180, 130],
};

var ctx = document.getElementById('usagechart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: data.labels,
        datasets: [
            {
                label: 'Gel utilisé (ml)',
                backgroundColor: '#1B9C85',
                data: data.gelUtilise,
            },
            {
                label: 'Mains détectées',
                backgroundColor: '#FF0060',
                data: data.mainsDetectees,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

var ctx = document.getElementById('gel-chart2').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.labels,
        datasets: [
            {
                label: 'Gel utilisé (ml)',
                backgroundColor: '#1B9C85',
                data: data.gelUtilise,
            }
        ]
    }
})

var ctx = document.getElementById('hands-chart2').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.labels,
        datasets: [
            {
                label: 'Mains détectées',
                backgroundColor: '#FF0060',
                data: data.mainsDetectees,
            }
        ]
    }
})