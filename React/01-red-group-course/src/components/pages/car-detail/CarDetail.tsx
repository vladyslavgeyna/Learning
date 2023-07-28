import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import carService from "../../../services/CarService";
import CarItem from "../home/car-item/CarItem";
import styles from './CarDetail.module.scss'
import {withAuth} from "../../../HOC/withAuth";
import {ICar} from "../../../types/car.interface";

const CarDetail = () => {
    const {id} = useParams()
    const [car, setCar] = useState<ICar>({} as ICar)

    useEffect(() => {
        if (!id) return
        const fetchData = async () => {
            const data = await carService.getById(id);
            setCar(data)
        }
        fetchData()
    }, [id])

    if (!car.id) return <p>Loading...</p>

    return (
        <div>
            <Link className={styles.link} to={'/'}>Back</Link>
            <CarItem car={car}/>
        </div>
    );
};

export default withAuth(CarDetail)
