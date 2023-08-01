import { useState } from 'react'
import CreateRecipe from './components/create-recipe/CreateRecipe.js'
import Header from './components/header/Header.js'
import RecipeItem from './components/recipe-item/RecipeItem.js'
import { useGetRecipesQuery } from './store/api/api.js'

// const userId = 1

function App() {
	const [searchTerm, setSearchTerm] = useState('')

	const [queryTerm, setQueryTerm] = useState('')

	const { isLoading, data: recipes } = useGetRecipesQuery(queryTerm)

	const handleSearch = () => {
		setQueryTerm(searchTerm)
	}

	return (
		<section>
			<Header />
			<CreateRecipe />
			<div
				style={{
					padding: '10px',
					display: 'flex',
					flexDirection: 'column',
					width: '50%'
				}}>
				<input
					type='search'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					placeholder='Enter search term'
				/>
				<button onClick={handleSearch}>Search</button>
			</div>
			{/* <User /> */}
			<div>
				{isLoading
					? 'Loading...'
					: recipes?.length
					? recipes.map(recipe => (
							<RecipeItem key={recipe.id} recipe={recipe} />
					  ))
					: 'No recipes'}
			</div>
		</section>
	)
}

export default App
