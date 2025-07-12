import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import { loginLoader, verifyLoader } from './loaders/verify.loader';
import ErrorElement from './components/ErrorElement';
// import Login from './pages/Login';
// import AddFoodItem from './pages/service-provider/AddFoodItem';
// import AdminDashboard from './pages/admin/Dashboard';
// import AddAccommodation from './pages/service-provider/AddAccommodation';
// import CustomerRegistration from './pages/CutomerRegistration';
// import ServiceProviderRegistration from './pages/ServiceProviderRegistration';
// import VerifySP from './pages/admin/VerifySP';
// import FoodSection from './pages/customer/FoodSection';
// import FoodCart from './pages/customer/FoodCart';
// import ServiceProviderList from './pages/customer/ServiceProviderList';
// import ServiceProviderDetail from './pages/customer/ServiceProviderDetail';
// import AccommodationProviderList from './pages/customer/AccommodationProviderList';
// import AccommodationProviderDetail from './pages/customer/AccommodationProviderDetail';
// import FoodProvidersPage from './pages/admin/ViewFoodOrder';
// import FoodProviderOrdersPage from './pages/admin/FoodOders';
// import FoodCheckout from './pages/customer/FoodCheckout';
// import FoodOrderHistory from './pages/customer/FoodOrderHistory';
// import ProfilePage from './pages/service-provider/Profile';
// import ManageCustomers from './pages/admin/ManageCustomer';
// import FoodServiceDashboard from './pages/service-provider/FoodServiceDashboard';
// import AccommodationServiceDashboard from './pages/service-provider/AccommodationServiceDashboard';
// import ManageSP from './pages/admin/ManageSp';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		// loader: loginLoader,
	},
	// {
	// 	path: '/customer-registration',
	// 	element: <CustomerRegistration />,
	// },

	// {
	// 	path: '/service-provider-registration',
	// 	element: <ServiceProviderRegistration />,
	// },
	// {
	// 	path: '/admin',
	// 	// element: <AdminLayout />, // optional layout if needed
	// 	// loader: verifyLoader,
	// 	// errorElement: <ErrorElement />,
	// 	children: [
	// 		{ path: 'dashboard', element: <AdminDashboard /> },
	// 		{ path: 'verify', element: <VerifySP /> },
	// 		{ path: 'food-providers', element: <FoodProvidersPage /> },
	// 		{ path: 'manage-customers', element: <ManageCustomers /> },
	// 		{ path: '/admin/food-providers/:id', element: <FoodProviderOrdersPage /> },
	// 		{ path: 'manage-sp', element: <ManageSP /> },
	// 	],
	// },
	// {
	// 	path: '/service-provider',
	// 	// element: , // Dashboard avse ahiya
	// 	// loader: verifyLoader,
	// 	// errorElement: <ErrorElement />,
	// 	children: [
	// 		{ path: 'add-food', element: <AddFoodItem /> },
	// 		{ path: 'add-accommodation', element: <AddAccommodation /> },
	// 		{ path: 'profile/:id', element: <ProfilePage /> },
	// 		{ path: 'foodservice-dashboard', element: <FoodServiceDashboard /> },
	// 		{ path: 'accommodationservice-dashboard', element: <AccommodationServiceDashboard /> },
	// 	],
	// },
	// {
	// 	path: '/customer',
	// 	// element: , // Dashboard avse ahiya
	// 	// loader: verifyLoader,
	// 	// errorElement: <ErrorElement />,
	// 	children: [
	// 		{ path: 'food', element: <ServiceProviderList /> },
	// 		{ path: '/customer/food-service-provider/:id', element: <ServiceProviderDetail /> },
	// 		{ path: 'cart', element: <FoodCart /> },
	// 		{ path: 'accommodations', element: <AccommodationProviderList /> },
	// 		{
	// 			path: '/customer/accommodation-service-provider/:id',
	// 			element: <AccommodationProviderDetail />,
	// 		},
	// 		{ path: 'food-checkout', element: <FoodCheckout /> },
	// 		{ path: 'order-history', element: <FoodOrderHistory /> },
	// 	],
	// },
	{
		path: '*',
		element: <ErrorElement />,
	},
]);
export default routes;
