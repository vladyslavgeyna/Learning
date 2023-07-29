import IUser from '../IUser'

// declare module 'express-serve-static-core' {
// 	interface Request {
// 		user?: IUser
// 	}
// }

declare module 'express' {
	interface Request {
		user?: IUser
	}
}
