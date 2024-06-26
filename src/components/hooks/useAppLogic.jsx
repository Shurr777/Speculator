import {useEffect, useState} from "react";
import {
    defaultCityStoragesData,
    defaultDepositData,
    defaultStoragesData,
    settings,
    gameStatuses
} from "../../config";

export const useAppLogic = () => {
    const [currentCity, setCurrentCity] = useState(1);
    const [selectedGood, setSelectedGood] = useState(null);
    const [deposits, setDeposits] = useState(defaultDepositData)
    const [playerStorages, setPlayerStorages] = useState(defaultStoragesData);
    const [cityStorages, setCityStorages] = useState(defaultCityStoragesData)
    const [money, setMoney] = useState(settings.startMoney);
    const [days, setDays] = useState(1);
    const [transportOrders, setTransportOrders] = useState([])
    const [orderId, setOrderId] = useState(1);
    const [gameStatus, setGameStatus] = useState(gameStatuses.new);

    const getCurrentStorage = (storages) => {
        const store = storages.find((storage) => {
            return storage.cityId === currentCity
        });
        if(store) {
            return store.storage
        } else {
            return []
        }
    }

    const cellGoods = (goodId, qty, totalPrice) => {
        const storagesNew = [...playerStorages];
        let moneyNew = money

        const index = playerStorages.findIndex((storage) => {
            return storage.cityId === currentCity
        })

        if(index > -1) {
            const goodIndex = storagesNew[index].storage.findIndex((good) => {
                return good.id === goodId;
            });

            if(goodIndex > -1) {
                const currentCityStorage = getCurrentStorage(cityStorages);

                const cityGoodIndex = currentCityStorage.findIndex(good => {
                    return good.id === goodId;
                });

                if(cityGoodIndex > -1) {
                    if(storagesNew[index].storage[goodIndex].qty >= qty) {

                        storagesNew[index].storage[goodIndex].qty -= qty
                        moneyNew += totalPrice;

                        if(storagesNew[index].storage[goodIndex].qty === 0) {
                            removeProduct(storagesNew[index].storage[goodIndex].id)
                        }

                        setMoney(moneyNew)
                    }
                }
            }
        }
        setPlayerStorages(storagesNew);
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    const updateCityStorages = () => {
        const newCityStorages = cityStorages;

        for (let cityIndex = 0; cityIndex < newCityStorages.length; cityIndex++) {
            const storage = newCityStorages[cityIndex].storage;

            for (let goodIndex = 0; goodIndex < storage.length; goodIndex++) {
                const goodData = storage[goodIndex]; //id, priceStats, maxStep, min, max price
                const priceChangeSign = getRandomInt(2) ? 1 : -1;
                const priceChangeValue = getRandomInt(goodData.maxStep + 1) * priceChangeSign;

                let newPrice = goodData.priceStats.slice(-1).pop() + priceChangeValue;

                if(newPrice > goodData.maxPrice) {
                    newPrice = goodData.maxPrice
                }

                if(newPrice < goodData.minPrice) {
                    newPrice = goodData.minPrice
                }

                for (let i = 0; i < goodData.priceStats.length - 1; i++) {
                    goodData.priceStats[i] = goodData.priceStats[i + 1];
                }

                goodData.priceStats[goodData.priceStats.length - 1] = newPrice


                newCityStorages[cityIndex][goodIndex] = goodData;
            }
        }

        setCityStorages(newCityStorages)
    }

    const updateTransportOrders = () => {
        setTransportOrders((oldTransportOrders) => {
            const newOrders = [...oldTransportOrders];

            newOrders.forEach((order, index) => {
                if(order.days >= 1) {
                    --order.days
                }
            });
            return newOrders;
        })
    }

    const updateDeposits = () => {
        setDeposits((oldDeposits) => {
            const newDeposits = [...oldDeposits];

            newDeposits.forEach((deposit, index) => {
                if(deposit.days >= 1) {
                    deposit.days--;
                }

                if(deposit.days === 0) {
                    newDeposits.splice(index, 1)

                    setMoney(oldMoney => {
                        return oldMoney + deposit.amount * 1.1
                    });
                }
            });
            return newDeposits
        })
    }

    const createTransportOrder = (targetCityId) => {
        const newOrders = [...transportOrders];

        const storage = getCurrentStorage(playerStorages)
        const goodIndex = storage.findIndex(good => good.id === selectedGood);

        if(goodIndex > -1) {
            newOrders.push({
                id: orderId,
                fromCityId: currentCity,
                targetCityId,
                qty: storage[goodIndex].qty,
                goodId: selectedGood,
                days: 3,
            })
            setOrderId(orderId + 1)
            removeProduct(selectedGood);
            setTransportOrders(newOrders)
        }
    }

    const removeProduct = (productId) => {
        const storagesNew = playerStorages;

        const index = playerStorages.findIndex((storage) => {
            return storage.cityId === currentCity
        })

        if(index > -1) {
            const productIndex = storagesNew[index].storage.findIndex((product) => {
                return product.id === productId;
            });

            if(productIndex > -1) {
                storagesNew[index].storage.splice(productIndex, 1)
            }
        }
        setPlayerStorages(storagesNew);
    };

    const buyGoods = (goodId, qty, price) => {
        const totalPrice = qty * price;

        if(money >= totalPrice) {
            const storagesNew = playerStorages;

            const index = playerStorages.findIndex((storage) => {
                return storage.cityId === currentCity
            })

            if(index > -1) {
                const goodIndex = storagesNew[index].storage.findIndex((good) => {
                    return good.id === goodId
                });

                if(goodIndex > -1) {
                    const newQty = parseInt(storagesNew[index].storage[goodIndex].qty) + parseInt(qty, 10)
                    storagesNew[index].storage[goodIndex].qty = newQty;
                } else {
                    storagesNew[index].storage.push({
                        id: goodId,
                        qty: qty
                    });
                }
            }

            setPlayerStorages(storagesNew);
            setMoney(money - totalPrice)
        }
    }

    const acceptOrder = (order) => {
        setTransportOrders(orders => {
            const newOrders = [...orders];

            const index = newOrders.findIndex(o => {
                return o.id === order.id;
            });

            if(index > -1) {
                newOrders.splice(index, 1);
            }
            return newOrders
        })
        //update product qty in target city
        const storagesNew = playerStorages;

        const index = playerStorages.findIndex((storage) => {
            return storage.cityId === order.targetCityId;
        })

        if(index > -1) {
            const goodIndex = storagesNew[index].storage.findIndex((good) => {
                return good.id === order.goodId
            });

            if(goodIndex > -1) {
                storagesNew[index].storage[goodIndex].qty += order.qty;
            } else {
                storagesNew[index].storage.push({
                    id: order.goodId,
                    qty: order.qty
                });
            }
        }
        setPlayerStorages(storagesNew);
    }

    const getSelectedProductPrice = () => {
        const cityStorage = getCurrentStorage(cityStorages);

        const product = cityStorage.find(product => {
            return product.id === selectedGood
        })

        if(product && product.priceStats) {
            return product.priceStats[product.priceStats.length - 1]
        }
        return 0;
    }

    const openDeposit = (amount) => {
        if(amount > 0 && money >= amount) {
            setDeposits((oldDeposits) => {
                const newDeposits = [...oldDeposits];

                newDeposits.push({
                    days: 30,
                    amount
                })

                setMoney(oldMoney => {
                    return oldMoney - amount
                });
                return newDeposits
            })
        }
    }

    const checkGameStatus = (days) => {
        if(days > settings.goalDays && money < settings.goalMoney) {
            //fail
            setGameStatus(gameStatuses.fail)
        }

        if(money >= settings.goalMoney) {
            //win
            setGameStatus(gameStatuses.win)
        }
    }

    const liveProcess = () => {
        setTimeout(() => {
            updateCityStorages();
            updateTransportOrders();
            updateDeposits()
            checkGameStatus(days + 1)

            setDays(days => days + 1);
        }, 5000)
    }

    useEffect(() => {
        if(gameStatus === gameStatuses.new) {
            liveProcess()
        }
    }, [days]);

    return {
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
    }
}