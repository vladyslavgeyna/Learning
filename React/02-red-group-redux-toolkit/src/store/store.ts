import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { api } from './api/api.js'
import { reducer as favoriteReducer } from './favorites/favorites.slice.js'
import { userSlice } from './user/user.slice.js'

const logger = createLogger({
	collapsed: true
})

const reducers = combineReducers({
	favorites: favoriteReducer,
	user: userSlice.reducer,
	[api.reducerPath]: api.reducer
})

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware).concat(logger)
})

export type RootState = ReturnType<typeof store.getState>
