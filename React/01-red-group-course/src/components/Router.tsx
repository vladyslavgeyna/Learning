import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CarDetail from './pages/car-detail/CarDetail'
import Home from './pages/home/Home'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Home />} path='/' />
				<Route element={<CarDetail />} path='/cars/:id' />
				<Route element={<div>Not found</div>} path='*' />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
