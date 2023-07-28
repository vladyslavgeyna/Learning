import CreateCarForm from "./create-car-form/CreateCarForm";
import carService from "../../../services/CarService";
import Player from "./Player";
import {useQuery} from "@tanstack/react-query";
import Header from "../../ui/Header";
import Catalog from "../../ui/Catalog";
import React from "react";

const Home = () => {
    const {data, isLoading} = useQuery(['cars'], () => carService.getAll())

    if(isLoading) return <p>Loading...</p>

    return (
        <div>
            <h1>Cars catalog</h1>
            <Header/>
            {/*<Player/>*/}
            <CreateCarForm />
            <Catalog data={data}/>
        </div>
    )
}

export default Home
