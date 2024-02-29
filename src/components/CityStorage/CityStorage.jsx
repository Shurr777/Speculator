import React from 'react';
import './CityStorage.scss';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const CityStorage = () => {

    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        datasets: [
            {
                label: 'Цена за шт',
                data: [12, 19, 3, 5, 2, 3, 14, 25],
                fill: false,
                backgroundColor: "#a68156",
                borderColor: "rgba(166, 129, 86, 0.2)"
            }
        ]
    }

    const options = {
        legend: {
            display: false,
        },
        maintainAspectRatio: false,

        tooltips: {
            mode: "index",
            intersect: false,
            caretSize: 3,

            backgroundColor: "#44200c",
            bodyFontColor: "#a68156",
            borderWidth: 1,
            displayColors: false,
        },

        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                    gridLines: {
                        display: false,
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        display: false,
                    }
                },
            ],
        },
    };


    return (
        <div>
            <h2 className="title">Городской склад</h2>
            <div className="panel">
                <div className="city-goods">
                    <div className="good-item-wrapper">
                        <div className="good-item item-1"></div>
                        <div className="good-item-stats">
                            <Line
                                options={options}
                                data={data}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CityStorage;