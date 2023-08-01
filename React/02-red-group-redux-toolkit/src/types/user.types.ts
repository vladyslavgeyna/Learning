export interface IUser {
	id: number
	name: string
}

export interface IInitialUserState {
	isLoading: boolean
	error: string | null
	user: IUser
}
