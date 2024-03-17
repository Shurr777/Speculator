import './App.scss';
import Cities from "../Cities/Cities";
import Storage from "../Storage/Storage";
import CityStorage from "../CityStorage/CityStorage";
import Transportation from "../Transportation/transportattion";
import Stats from "../Stats/Stats";
import {useState, useEffect} from "react";

function App() {
    const [currentCity, setCurrentCity] = useState(1);
    const [selectedGood, setSelectedGood] = useState(null);
    const [storages, setStorages] = useState([
        {
            cityId: 1,
            storage: [
                {
                    id: 1,
                    qty: 10
                },
                {
                    id: 2,
                    qty: 12
                },
                {
                    id: 3,
                    qty: 193
                },
                {
                    id: 4,
                    qty: 144
                },
                {
                    id: 5,
                    qty: 155
                },
                {
                    id: 6,
                    qty: 176
                },
                {
                    id: 7,
                    qty: 137
                },
                {
                    id: 8,
                    qty: 158
                },
            ]
        },
        {
            cityId: 2,
            storage: [
                {
                    id: 1,
                    qty: 25
                },
                {
                    id: 2,
                    qty: 15
                },
            ]
        },
    ]);
    const [cityStorages, setCityStorages] = useState([
        {
            cityId: 1,
            storage: [
                {
                    id: 1,
                    priceStats: [10, 15, 18, 13, 15, 32, 28],
                    maxStep: 5,
                    minPrice: 10,
                    maxPrice: 40,
                },
                {
                    id: 2,
                    priceStats: [12, 13, 18, 13, 15, 32, 28],
                    maxStep: 7,
                    minPrice: 5,
                    maxPrice: 70
                },
                {
                    id: 3,
                    priceStats: [25, 28, 31, 24, 18, 27, 28],
                    maxStep: 8,
                    minPrice: 15,
                    maxPrice: 50
                },
            ],
        },
        /*{
            cityId: 2,
            storage: [],
        }*/
    ])
    const [money, setMoney] = useState(1000);
    const [days, setDays] = useState(1);
    const goods = [
        {
            id: 1,
            title: 'Пиво'
        },
        {
            id: 2,
            title: 'Молоко'
        },
        {
            id: 3,
            title: 'Зерно'
        },
        {
            id: 4,
            title: 'Грибы'
        },
        {
            id: 5,
            title: 'Клевер'
        },
        {
            id: 6,
            title: 'Лук'
        },
        {
            id: 7,
            title: 'Виноград'
        },
        {
            id: 8,
            title: 'Орехи'
        },
        {
            id: 9,
            title: 'Вилы'
        },
        {
            id: 10,
            title: 'Доски'
        },
        {
            id: 11,
            title: 'Коса'
        },
        {
            id: 12,
            title: 'Лопата'
        },
        {
            id: 13,
            title: 'Топор'
        },
        {
            id: 14,
            title: 'Кирка'
        }
    ];
    const [transportOrders, setTransportOrders] = useState([])


    const getStorageByCity = () => {
        const store = storages.find((storage) => {
            return storage.cityId === currentCity
        });
        if(store) {
            return store.storage
        } else {
            return []
        }
    }

    const getCityStorageByCity = () => {
        const store = cityStorages.find((storage) => {
            return storage.cityId === currentCity
        });
        if(store) {
            return store.storage
        } else {
            return []
        }
    }

    const getCityStorage = () => {
        const store = cityStorages.find((storage) => {
            return storage.cityId === currentCity
        });
        if(store) {
            return store.storage
        } else {
            return []
        }
    }

    const cellGoods = (goodId, qty) => {
        const storagesNew = storages;
        let moneyNew = money

        const index = storages.findIndex((storage) => {
            return storage.cityId === currentCity
        })

        if(index > -1) {
            const goodIndex = storagesNew[index].storage.findIndex((good) => {
                return good.id === goodId;
            });

            if(goodIndex > -1) {
                const currentCityStorage = getCityStorageByCity();

                const goodIndex = currentCityStorage.findIndex(good => {
                    return good.id === goodId;
                });

                if(goodIndex > -1) {
                    const price =
                        currentCityStorage[goodIndex].priceStats[
                        currentCityStorage[goodIndex].priceStats.length - 1
                            ];

                    if(storagesNew[index].storage[goodIndex].qty >= qty) {

                        storagesNew[index].storage[goodIndex].qty -= qty
                        moneyNew += qty * price;
                        setMoney(moneyNew)
                    }
                }
            }
        }
        setStorages(storagesNew);
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
                const priceChangeValue = getRandomInt(goodData.maxStep) * priceChangeSign;

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

    const liveProcess = () => {
        setInterval(() => {
            updateCityStorages();
            updateTransportOrders()
            setDays(days => days + 1);
        }, 3000)
    }

    const createTransportOrder = (targetCityId) => {
        const newOrders = [...transportOrders];

        const storage = getStorageByCity()
        const goodIndex = storage.findIndex(good => good.id === selectedGood);

        if(goodIndex > -1) {
            newOrders.push({
                fromCityId: currentCity,
                targetCityId,
                qty: storage[goodIndex].qty,
                goodId: selectedGood,
                days: 30,
            })

            removeProduct(selectedGood);

            setTransportOrders(newOrders)
        }

       /* console.log('NewOrders', newOrders)*/
    }

    const removeProduct = (productId) =>{
        const storagesNew = storages;

        const index = storages.findIndex((storage) => {
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
        setStorages(storagesNew);
    };

    const buyGoods = (goodId, qty, price) => {
        const totalPrice = qty * price;
        if(money >= totalPrice) {

            const storagesNew = storages;

            const index = storages.findIndex((storage) => {
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

            setStorages(storagesNew);
            setMoney(money - totalPrice)
        }
    }

    useEffect(() => {
        liveProcess()
    }, []);

    return (
        <div className="app">
            <h1 className="app-name">
                Спекулянт
            </h1>
            <Cities currentCity={currentCity}
                    onChange={(city) => {
                        setCurrentCity(city)
                    }}
            />

            <div className="content">
                <div className="column">
                    <div className="storage">
                        <Storage currentCity={currentCity}
                                 storage={getStorageByCity()}
                                 goods={goods}
                                 selectedGood={selectedGood}
                                 onSelectGood={(goodId) => {
                                     setSelectedGood(goodId)
                                 }}
                                 onCell={(id, qty) => {
                                     cellGoods(id, qty)
                                 }}
                                 onTransport={(targetCityId) => {
                                     createTransportOrder(targetCityId)
                                 }}
                        />
                    </div>
                    <div className="transportation">
                        <Transportation orders={transportOrders}
                                        goods={goods}
                        />
                    </div>
                    <div className="stats">
                        <Stats days={days}
                               money={money}

                        />
                    </div>
                </div>
                <div className="column">
                    <div className="city-storage">
                        <CityStorage
                            storage={getCityStorage()}
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
