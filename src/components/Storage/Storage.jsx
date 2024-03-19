import React, {useState} from 'react';
import './Storage.scss';
import {cities} from "../../cities";
import {isDisabled} from "@testing-library/user-event/dist/utils";

const Storage = (props) => {

    const [qty, setQty] = useState('');
    const [targetCityId, setTargetCityId] = useState(1);

    const findGoodById = (id) => {
        return props.goods.find((item) => {
            return item.id === id
        }).title;
    }

    const getTotalPrice = () => {
        return parseInt(props.selectedProductPrice * qty * 0.9, 10);
    }

    return (<div>
        <h2 className="title">Мой склад</h2>
        <div className="panel">
            <ul className="goods">
                {Array(8)
                    .fill()
                    .map((i, index) => {
                        if(props.storage[index]) {
                            const item = props.storage[index];

                            return (
                                <li key={"storage-item-" + item.id}
                                    className={"good-item item-" + item.id +
                                        (props.selectedGood === item.id ? ' selected' : "")}
                                    onClick={() => {
                                        props.onSelectGood(item.id)
                                    }
                                    }
                                >
                                    <span className="good-description">{item.qty} шт</span>
                                </li>
                            );
                        } else {
                            return (
                                <li key={"empty-cell-" + index}
                                    className="good-item no-item"></li>
                            )
                        }
                    })}
            </ul>
            {props.selectedGood ? (
                <>
                    <div className='sell-panel'>
                        <div className="sell-panel-content">
                            <div>{findGoodById(props.selectedGood)}</div>
                            <div className='controls'>
                                <input type="text"
                                       className="input"
                                       maxLength="5"
                                       value={qty}
                                       onChange={(e) => {
                                           setQty(parseInt(e.target.value, 10) || "")
                                       }}
                                />
                                шт
                                <button className="button"
                                        onClick={() => {
                                            props.onCell(props.selectedGood, qty, getTotalPrice());
                                            //setQty('')
                                        }}
                                        disabled={!qty || !props.selectedProductPrice}
                                >
                                    Продать
                                </button>
                            </div>
                        </div>
                        {qty && props.selectedProductPrice ? (
                            <div className="sell-panel-info">
                                Цена {props.selectedProductPrice} x {qty} шт, налог: 10% Итого: {getTotalPrice()}
                            </div>
                        ) : ""}
                    </div>

                    <div className='order-panel'>
                        <div>
                            <select className="select-city"
                                    value={targetCityId}
                                    onChange={(e) => {
                                        console.log("cityId", e.currentTarget.value)
                                        setTargetCityId(parseInt(e.currentTarget.value, 10))
                                    }}
                            >
                                {cities.map(city => {
                                        return <option
                                            value={city.id}
                                            disabled={city.id === props.currentCity}
                                        >
                                            {city.title}
                                        </option>
                                    }
                                )}
                            </select>
                        </div>
                        <div className='controls'>
                            <button className="button"
                                    onClick={() => {
                                        props.onTransport(targetCityId)
                                    }}
                                    disabled={targetCityId === props.currentCity}
                            >
                                Перевезти
                            </button>
                        </div>
                    </div>
                </>
            ) : ""}
        </div>
    </div>);
};

export default Storage;