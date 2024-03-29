import React, {useState} from 'react';
import './Bank.scss';

const Bank = (props) => {

    const [amount, setAmount] = useState('')

    return (
        <div>
            <h2 className="title">Банк</h2>
            <div className="panel">

                <div className='sell-panel'>
                    <div className="sell-panel-content">
                        <div>Сумма</div>
                        <div className='controls'>
                            <input type="text"
                                   className="input"
                                   maxLength="4"
                                   value={amount}
                                   onChange={(e) => {
                                       setAmount(parseInt(e.target.value, 10) || "")
                                   }}
                            />
                            <button className="button"
                                    onClick={() => {
                                        props.onOpenDeposit(amount);
                                        //setQty('')
                                    }}
                                    disabled={!amount || props.money < amount}
                            >
                                Открыть
                            </button>
                        </div>
                    </div>
                </div>

                {props.deposits.map((deposit, index) => {
                    return (
                        <div
                        key={'deposit-' + index}
                            className="good-item-wrapper"
                        >
                            <div className="good-item-description">
                                <div className="good-item item-deposit"/>
                            </div>
                            <div className="good-item-deposit-info">
                                <div>
                                    <div className="header">Сумма: {deposit.amount}</div>
                                    <div className="days">
                                        Дней до получения процента: {deposit.days}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Bank;