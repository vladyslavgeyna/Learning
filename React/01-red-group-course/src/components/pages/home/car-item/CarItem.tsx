import React, {FC, useState} from 'react';
import styles from "../Home.module.scss";
import {Link} from "react-router-dom";
import Price from "./Price";
import {ICar} from "../../../../types/car.interface";

const CarItem: FC<{car: ICar}> = ({car}) => {
    const [count, setCount] = useState(0)

    return (
        <div className={styles.item}>
            <div
                className={styles.image}
                style={{backgroundImage: `url(${car.image})`}}
            />
            <div className={styles.info}>
                <h2>{car.name}</h2>
                <button
                    onClick={() => setCount(prevState => prevState + 1)}
                    className="btn">Click
                </button>
                <Price price={car.price}/>
                <Link to={`/cars/${car.id}`} className={'btn'}>Read more</Link>
            </div>
         </div>
    );
};

export default CarItem;
