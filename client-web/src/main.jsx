import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
// import { Provider } from 'react-redux';
// import store from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	// <Provider store={store}>
	<PrimeReactProvider value={{ ripple: true }}>
		<App />
	</PrimeReactProvider>
	// </Provider>
);
