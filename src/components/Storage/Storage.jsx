import React, {useState} from 'react';
import './Storage.scss';

const Storage = (props) => {

    const [qty, setQty] = useState('')

    const findGoodById = (id) => {
        return props.goods.find((item) => {
            return item.id === id
        }).title;
    }

    const getEmptyCells = () => {
        if(props.storage.length < 8) {
            return Array(8 - props.storage.length)
                .fill()
                .map(() => {
                    return <li key={"empty-cell-" + (8 - props.storage.length)}
                               className="good-item no-item"></li>
                })
        }
    }

    return (<div>
        <h2 className="title">Мой склад</h2>
        <div className="panel">
            <ul className="goods">
                {props.storage.map((item) => {
                    return <li key={"storage-item-" + item.id}
                               className={"good-item item-" + item.id +
                                   (props.selectedGood === item.id ? ' selected' : "")}
                               onClick={() => {
                                   props.onSelectGood(item.id)
                               }
                               }
                    >
                        <span className="good-description">{item.qty} шт</span>
                    </li>
                })}
                {getEmptyCells()}
            </ul>
            {props.selectedGood ? (
                <div className='sell-panel'>
                    <div>{findGoodById(props.selectedGood)}</div>
                    <div className='controls'>
                        <input type="text"
                               className="input"
                               maxLength="5"
                               value={qty}
                               onChange={(event) => {
                                   setQty(parseInt(event.target.value, 10) || '')
                               }}
                        />шт
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
            ) : ""}
        </div>
    </div>);
};

export default Storage;