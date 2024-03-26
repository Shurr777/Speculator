import React, {useState} from 'react';
import './CityStorage.scss';
import StorageItem from "./components/StorageItem";
import {Line} from 'react-chartjs-2';

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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const CityStorage = ({storage, onBuy}) => {

    const options = {
        legend: {
            display: false,
        },
        maintainAspectRatio: false,

        tooltips: {
            mode: "index",
            intersect: false,
            caretSize: 3,

            backgroundColor: "#8d6048",
            bodyFontColor: "#d6ba7a",
            borderColor: "#8d6048",
            borderWidth: 1,
            displayColors: false,
        },

        scales: {
            /*yAxes: [
                {
                    ticks: {
                        beginAtZero: false,
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
            ],*/
        },
    };

    const getGoodData = (priceStats) => {
        return {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
            datasets: [
                {
                    label: 'Цена за шт',
                    data: priceStats,
                    backgroundColor: "#8d6048",
                    borderColor: "#8d604844"
                }
            ],
        }
    }

    return (
        <div>
            <h2 className="title">Городской склад</h2>
            <div className="panel">
                <div className="city-goods">
                    {storage.map((good) => {
                        return (
                            <div key={"storage-item" + good.id} className="good-item-wrapper">
                                <StorageItem good={good} onBuy={onBuy}/>
                                <div className="good-item-stats">
                                    <Line
                                        data={getGoodData(good.priceStats)}
                                        options={options}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CityStorage;