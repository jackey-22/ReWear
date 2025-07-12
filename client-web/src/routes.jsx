import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import { loginLoader, verifyLoader } from './loaders/verify.loader';
import ErrorElement from './components/ErrorElement';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import VerifyProduct from './pages/admin/VerifyProduct';
import ShowProduct from './pages/ShowProduct';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/user/AddProduct';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		// loader: loginLoader,
	},
	{
		path: '/products',
		element: <ShowProduct />,
		// loader: loginLoader,
	},
	{
		path: '/products/:id',
		element: <ProductDetails />,
	},
	{
		path: '/login',
		element: <Login />,
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
		path: '/admin',
		// element: <AdminLayout />, // optional layout if needed
		// loader: verifyLoader,
		errorElement: <ErrorElement />,
		children: [
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'verify-product', element: <VerifyProduct /> },
		],
	},
	{
		path: '/user',
		// element: <Dashboard />, // Dashboard avse ahiya
		//loader: verifyLoader,
		errorElement: <ErrorElement />,
		children: [{ path: 'add-product', element: <AddProduct /> }],
	},
	{
		path: '*',
		element: <ErrorElement />,
	},
]);
export default routes;
