import { RouterProvider } from 'react-router-dom';
import StandardErrorBoundary from './components/StandardErrorBoundary';
import routes from './routes';

function App() {
	return (
		<StandardErrorBoundary>
				<RouterProvider router={routes} />
		</StandardErrorBoundary>
	);
}

export default App;
