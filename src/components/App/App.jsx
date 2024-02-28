import './App.scss';
import Cities from "../Cities/Cities";
import Storage from "../Storage/Storage";
import CityStorage from "../CityStorage/CityStorage";
import {useState} from "react";
import Transportation from "../Transportation/transportattion";
import Stats from "../Stats/Stats";

function App() {
    const [currentCity, setCurrentCity] = useState(1);
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

    const getStorageByCity = () => {
        const store = storages.find((storage)=>{
            return storage.cityId === currentCity
            });
        if(store){
            return store.storage
        }else {
            return []
        }
    }

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
                        />
                    </div>
                    <div className="transportation">
                        <Transportation/>
                    </div>
                    <div className="stats">
                        <Stats/>
                    </div>
                </div>
                <div className="column">
                    <div className="city-storage">
                        <CityStorage/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
