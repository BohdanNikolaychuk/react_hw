import { IAuthors } from '../../@types/IAuthors'

export type State = {
	authorsList: IAuthors[]
	status: 'init' | 'loading' | 'error' | 'success'
}
