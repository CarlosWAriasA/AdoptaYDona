import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({
	// eslint-disable-next-line react/prop-types
	canActivate,
	// eslint-disable-next-line react/prop-types
	redirectPath = "/",
}) => {
	if (!canActivate) {
		return <Navigate to={redirectPath} replace />
	}
	return <Outlet />
}

export default ProtectedRoute
