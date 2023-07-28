import React from 'react';
import styles from './CreateCarForm.module.scss'
import {useForm} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import {useCreateCar} from "./useCreateCar";
import {ICarData} from "../../../../types/car.interface";

const clearData = {
    price: '',
    name: '',
    image: ''
}

const CreateCarForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<ICarData>({
        mode:'onChange'
    })

    const {createCar} = useCreateCar(reset)

    return (
        <form className={styles.form} onSubmit={handleSubmit(createCar)}>
            <input
                {...register('name', {required: 'Name is required'})}
                type="text"
                placeholder={'Name'}
            />
            <ErrorMessage error={errors?.name?.message}/>
            <input
                {...register('price', {required: true})}
                type="text"
                placeholder={'Price'}
            />
            <input
                {...register('image', {required: true})}
                type="text"
                placeholder={'Image'}
            />
            <button className={'btn'} >Create</button>
        </form>
    );
};

export default CreateCarForm;
