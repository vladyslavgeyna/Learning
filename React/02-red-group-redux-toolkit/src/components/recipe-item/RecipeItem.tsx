import { FC } from 'react'
import { useActions } from '../../hooks/useActions'
import { useFavorites } from '../../hooks/useFavorites.js'
import { IRecipe } from '../../types/recipe.types'
import styles from './RecipeItem.module.css'

interface IRecipeItemProps {
	recipe: IRecipe
}

const RecipeItem: FC<IRecipeItemProps> = ({ recipe }) => {
	const { favorites } = useFavorites()

	const { toggleFavorites } = useActions()

	const isRecipeInFavoritesExists = favorites.some(
		item => item.id === recipe.id
	)

	return (
		<div className={styles.item}>
			<img
				style={{ borderRadius: '10px' }}
				width='50%'
				src={recipe.image}
				alt='image'
			/>
			<h2>{recipe.name}</h2>
			<button onClick={() => toggleFavorites(recipe)}>
				{isRecipeInFavoritesExists ? (
					<span>Remove from favorites</span>
				) : (
					<span>Add to favorites</span>
				)}
			</button>
		</div>
	)
}

export default RecipeItem
