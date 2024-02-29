import React from 'react';
import './Stats.scss'

const Stats = ({days, money}) => {
    console.log('money', money)
    return (
        <div>
            <h2 className="title">Статистика</h2>
            <div className="panel stats-panel">
                <div className="money">
                    Деньги: {money}
                </div>
                <div className="date">
                    Текущий день: {days}
                </div>
            </div>
        </div>
    );
};

export default Stats;