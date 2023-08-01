import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRecipe } from '../../types/recipe.types'

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Recipe'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000/api/recipes'
	}),
	endpoints: builder => ({
		getRecipes: builder.query<IRecipe[], string>({
			query: searchTerm => `/?name=${searchTerm}`,
			providesTags: (result, error, searchTerm) => [
				{
					type: 'Recipe',
					id: searchTerm
				}
			]
		})
	})
})

export const { useGetRecipesQuery } = api
