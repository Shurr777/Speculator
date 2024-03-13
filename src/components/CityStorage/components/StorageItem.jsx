import React, {useState} from 'react';

const StorageItem = ({good, onBuy}) => {

    const [number, setNumber] = useState(0)

    return (
        <div>
            <div className="good-item-description">
                <div className={"good-item item-" + good.id}/>
                <input
                    className="input-number"
                    name="count"
                    value={number}
                    maxLength={3}
                    autoComplete="false"
                    onChange={(e) => {
                        setNumber(e.currentTarget.value)
                    }}
                />

                <button className="button"
                        onClick={() => {
                            onBuy(good.id, number, good.priceStats[good.priceStats.length - 1]);
                            setNumber(0);
                        }}
                >
                    Купить
                </button>

                <p className='price-description'>
                    {good.priceStats[good.priceStats.length - 1]} за ед.
                </p>
            </div>
        </div>
    );
};

export default StorageItem;