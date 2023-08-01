import { FormEvent, useState } from 'react'
import { useCreateRecipeMutation } from '../../store/api/recipe.api.js'
import { IRecipeData } from '../../types/recipe.types'

const defaultValue: IRecipeData = {
	name: '',
	image: ''
}

const CreateRecipe = () => {
	const [recipe, setRecipe] = useState<IRecipeData>(defaultValue)

	const [createRecipe] = useCreateRecipeMutation()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		createRecipe(recipe).then(() => {
			setRecipe({
				name: '',
				image: ''
			})
		})
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Create recipe</h2>
			<label>
				<input
					value={recipe.name}
					onChange={e =>
						setRecipe({ ...recipe, name: e.target.value })
					}
					type='text'
					placeholder='Name'
				/>
			</label>
			<label>
				<input
					value={recipe.image}
					onChange={e =>
						setRecipe({ ...recipe, image: e.target.value })
					}
					type='text'
					placeholder='Image'
				/>
			</label>
			<button type='submit'>Create</button>
		</form>
	)
}

export default CreateRecipe
