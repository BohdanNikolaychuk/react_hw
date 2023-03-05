import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux.hooks'
import { ROUTES } from '../../router/_Routes'

export const ProtectedRoute = ({ children }: any) => {
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const role = useAppSelector(state => state.auth.role)
	if (role !== 'admin' || !isAuth) {
		return <Navigate to={ROUTES.main} replace />
	}
	return children
}
