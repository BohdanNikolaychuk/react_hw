import { useAppSelector } from './../../store/store';
import { selectAuthData } from './../../store/user/selectors';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../router/_Routes';

export const ProtectedRoute = ({ children }: any) => {
  const { role, isAuth } = useAppSelector(selectAuthData);

  if (role !== 'admin' || !isAuth) {
    return <Navigate to={ROUTES.main} replace />;
  }
  return children;
};
