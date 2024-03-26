import React, {useState} from 'react';

const StorageItem = ({good, onBuy}) => {

    const [number, setNumber] = useState('')

    return (
        <div>
            <div className="good-item-description">
                <div className={"good-item item-" + good.id}/>
                <input
                    className="input-number"
                    name={"count" + new Date()}
                    value={number}
                    maxLength={3}
                    autoComplete="new-password"
                    onChange={(e) => {
                        setNumber(parseInt(e.currentTarget.value, 10 || ''))
                    }}
                />

                <button className="button"
                        onClick={() => {
                            if(number) {
                                onBuy(good.id, number, good.priceStats[good.priceStats.length - 1]);
                            }
                            setNumber('');
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