import React, {useState} from 'react';
import './Storage.scss';

const Storage = (props) => {

    const [qty, setQty] = useState('');
    const [targetCityId, setTargetCityId] = useState(1);

    const findGoodById = (id) => {
        return props.goods.find((item) => {
            return item.id === id
        }).title;
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
                        <div>{findGoodById(props.selectedGood)}</div>
                        <div className='controls'>
                            <input type="text"
                                   className="input"
                                   maxLength="5"
                                   value={qty}
                                   onChange={(e) => {
                                       setQty(parseInt(e.target.value, 10) || "")
                                   }}
                            />{" "}шт
                            <button className="button"
                                    onClick={() => {
                                        props.onCell(props.selectedGood, qty);
                                        setQty('')
                                    }}
                            >
                                Продать
                            </button>
                        </div>
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
                                <option value={1}>Город 1</option>
                                <option value={2}>Город 2</option>
                                <option value={3}>Город 3</option>
                            </select>
                        </div>
                        <div className='controls'>

                            <button className="button"
                                    onClick={() => {
                                        props.onTransport(targetCityId)
                                        //todo
                                    }}
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