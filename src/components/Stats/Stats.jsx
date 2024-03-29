import React from 'react';
import './Stats.scss'
import {settings} from "../../config";

const Stats = ({days, money}) => {
    return (
        <div>
            <h2 className="title">Статистика</h2>
            <div className="panel stats-panel">
                <div className="money">
                    {money} / {settings.goalMoney}
                </div>
                <div className="date">
                    Дни: {days} / {settings.goalDays}
                </div>
            </div>
        </div>
    );
};

export default Stats;