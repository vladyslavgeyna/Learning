import React, {FC} from 'react';
import {ICar} from "../../types/car.interface";
import CarItem from "../pages/home/car-item/CarItem";

interface ICatalog {
    data?: ICar[]
}

const Catalog: FC<ICatalog> = ({data = []}) => {
    return (
        <div >
            {data.length
                ? data.map(car => (<CarItem key={car.id} car={car}/>))
                : <p>There are no cars</p>}
        </div>
    );
};

export default Catalog;
