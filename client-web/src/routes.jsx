import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorElement from './components/ErrorElement';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import VerifyProduct from './pages/admin/VerifyProduct';
import ShowProduct from './pages/ShowProduct';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/user/AddProduct';
// import ClothingListPage from './pages/user/ClothingListPage';
import MySwapRequests from './pages/user/MySwapRequests';
import IncomingSwapRequests from './pages/user/IncomingSwapRequests';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/products',
		element: <ShowProduct />,
		// loader: loginLoader,
	},
	// {
	// 	path: '/Products',
	// 	element: <ShowProduct />,
	// 	// loader: loginLoader,
	// },
	{
		path: '/login',
		element: <Login />,
		// loader: loginLoader,
	},
	{
  path: '/products/:id',
  element: <ProductDetails />,
},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/admin',
		errorElement: <ErrorElement />,
		children: [
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'verify-product', element: <VerifyProduct /> },
		],
	},
	{
		path: '/user',
		errorElement: <ErrorElement />,
		children: [
			{ path: 'add-product', element: <AddProduct /> },
			{ path: 'my-requests', element: <MySwapRequests /> },
			{ path: 'incoming-requests', element: <IncomingSwapRequests /> },
		],
	},
	{
		path: '*',
		element: <ErrorElement />,
	},
]);

export default routes;
