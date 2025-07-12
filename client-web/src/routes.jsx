import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import { loginLoader, verifyLoader } from './loaders/verify.loader';
import ErrorElement from './components/ErrorElement';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import VerifyProduct from './pages/admin/VerifyProduct';	


const routes = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		// loader: loginLoader,
	},
	{
		path: '/',
		element: <ShowProduct/>,
		// loader: loginLoader,
	},
	{
		path: '/login',
		element: <Login.jsx/>,
		// loader: loginLoader,
	},
	{
		path: '/Register',
		element: <Register />,
		// loader: loginLoader,
	},

	{
		path: '/admin',
		// element: <AdminLayout />, // optional layout if needed
		// loader: verifyLoader,
		errorElement: <ErrorElement />,
		children: [
			{ path: 'dashboard', element: <AdminDashboard /> },
			{ path: 'verifyProduct', element: <VerifyProduct /> },
		],
	},
	{
		path: '/user',
		element: <Dashboard />	, // Dashboard avse ahiya
		//loader: verifyLoader,
		errorElement: <ErrorElement />,
		children: [
			{ path: '/AddProduct', element: <ServiceProviderList /> },	
		],
	},
	{
		path: '*',
		element: <ErrorElement />,
	},
]);
export default routes;
