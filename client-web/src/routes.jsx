import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import { loginLoader, verifyLoader } from './loaders/verify.loader';
import ErrorElement from './components/ErrorElement';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import VerifyProduct from './pages/admin/VerifyProduct';
import ShowProduct from './pages/ShowProduct';
import AddProduct from './pages/user/AddProduct';
import Profile from './pages/Profile';
import AdminProfile from './pages/admin/AdminProfile';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		// loader: loginLoader,
	},
	{
		path: '/Products',
		element: <ShowProduct />,
		// loader: loginLoader,
	},
	{
		path: '/login',
		element: <Login />,
		// loader: loginLoader,
	},
	{
		path: '/register',
		element: <Register />,
		// loader: loginLoader,
	},
	{
		path: '/profile',
		element: <Profile />,
		// loader: loginLoader,
	},

	{
		path: '/admin',
		// element: <AdminLayout />, // optional layout if needed
		// loader: verifyLoader,
		errorElement: <ErrorElement />,
		children: [
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'verify-product', element: <VerifyProduct /> },
			{ path: 'profile', element: <AdminProfile /> },
		],
	},
	{
		path: '/user',
		element: <Dashboard />, // Dashboard avse ahiya
		//loader: verifyLoader,
		errorElement: <ErrorElement />,
		children: [{ path: 'AddProduct', element: <AddProduct /> }],
	},
	{
		path: '*',
		element: <ErrorElement />,
	},
]);
export default routes;
