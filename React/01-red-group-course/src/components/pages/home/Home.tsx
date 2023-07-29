import { useQuery } from '@tanstack/react-query'
import React from 'react'
import carService from '../../../services/CarService'
import Catalog from '../../ui/Catalog'
import Header from '../../ui/Header'
import CreateCarForm from './create-car-form/CreateCarForm'

const Home = () => {
	const { data, isLoading } = useQuery(['cars'], () => carService.getAll())

	if (isLoading) return <p>Loading...</p>

	return (
		<div>
			<h1>Cars catalog</h1>
			<Header />
			{/*<Player/>*/}
			<CreateCarForm />
			<Catalog data={data} />
		</div>
	)
}

export default Home
