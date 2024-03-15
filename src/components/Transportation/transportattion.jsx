import React from 'react';
import './transportation.scss'
import {cities} from '../../cities'

const Transportation = (props) => {

    const findGoodById = (id) => {
        return props.goods.find((item) => {
            return item.id === id
        }).title;
    }

    const getCityNameById = (idx) => {
       return  cities.find((city) =>{
            return (city.id === idx)
        }).title
    }

    return (
        <div className="transportations">
            <h2 className="title">Активные перевозки</h2>
            <div className="panel">
                {props.orders.map((order) => {
                    return (
                        <div className="good-item-wrapper">
                            <div className="good-item-description">
                                <div className={"good-item item-" + order.goodId}/>
                            </div>
                            <div className="good-item-transport-info">
                                <div>
                                    <div className="header">{findGoodById(order.goodId)}</div>
                                    <div className="path">
                                        {getCityNameById(order.fromCityId)} ->
                                        {getCityNameById(order.targetCityId)}
                                    </div>
                                </div>
                                <div>
                                    <div className="days">Дни {order.days}</div>
                                    <button className="button"
                                            disabled={order.days ? true : false}
                                    >Получить
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Transportation;