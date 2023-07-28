import axios from "axios";
import {ICar, ICarData} from "../types/car.interface";

class CarService {
    #URL = 'http://localhost:3000/api/cars'

    async getAll() {
        const response = await axios.get<ICar[]>(this.#URL)
        return response.data;
    }

    async getById(id: string) {
        const response = await axios.get<ICar>(this.#URL + `/${id}`)
        return response.data;
    }

    async create(car: ICarData) {
        return axios.post(this.#URL, car)
    }
}

export default new CarService()