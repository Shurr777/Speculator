import React, {useState, useEffect} from "react";
import './App.scss';
import Cities from "../Cities/Cities";
import Storage from "../Storage/Storage";
import CityStorage from "../CityStorage/CityStorage";
import Transportation from "../Transportation/transportattion";
import Stats from "../Stats/Stats";
import Bank from "../Bank/Bank";
import {useAppLogic} from '../hooks/useAppLogic';

import {
    goods,
    gameStatuses
} from "../../config";

const App = () => {

    const {
        currentCity,
        setCurrentCity,
        getCurrentStorage,
        playerStorages,
        selectedGood,
        getSelectedProductPrice,
        setSelectedGood,
        cellGoods,
        createTransportOrder,
        transportOrders,
        acceptOrder,
        days,
        money,
        deposits,
        cityStorages,
        buyGoods,
        openDeposit,
        gameStatus
    } = useAppLogic();

    return (
        <div className="app">
            <h1 className="app-name">
                Деревенский торговец
            </h1>

            {gameStatus === gameStatuses.win ? (
                <h2 className="game-status win">Вы победили!</h2>
            ) : ''}

            {gameStatus === gameStatuses.fail ? (
                <h2 className="game-status fail">Вы проиграли!</h2>
            ) : ''}

            <Cities currentCity={currentCity}
                    onChange={(city) => {
                        setCurrentCity(city)
                    }}
            />

            <div className="content">
                <div className="column">
                    <div className="storage">
                        <Storage currentCity={currentCity}
                                 storage={getCurrentStorage(playerStorages)}
                                 goods={goods}
                                 selectedGood={selectedGood}
                                 selectedProductPrice={getSelectedProductPrice()}
                                 onSelectGood={(goodId) => {
                                     setSelectedGood(goodId)
                                 }}
                                 onCell={(id, qty, price) => {
                                     cellGoods(id, qty, price)
                                 }}
                                 onTransport={(targetCityId) => {
                                     createTransportOrder(targetCityId)
                                 }}
                        />
                    </div>
                    <div className="transportation">
                        <Transportation orders={transportOrders}
                                        goods={goods}
                                        onAcceptOrder={acceptOrder}
                        />
                    </div>
                    <div className="stats">
                        <Stats days={days}
                               money={money}
                        />
                    </div>
                    <div className="deposits">
                        <Bank deposits={deposits}
                              onOpenDeposit={openDeposit}
                              money={money}
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="city-storage">
                        <CityStorage
                            storage={getCurrentStorage(cityStorages)}
                            onBuy={(goodId, number, price) => {
                                buyGoods(goodId, number, price)
                            }
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
