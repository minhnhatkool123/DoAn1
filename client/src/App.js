import './scss/App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRecoilValue } from 'recoil';
import { toastDisplayState } from './recoil/toastDisplayState';
import { userState } from './recoil/userState';
import HomePage from './pages/HomePage';
import AccountInfoPage from './pages/AccountInfoPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage'
import DashboardPage from './pages/DashboardPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ToastMessage from './components/ToastMessage';
import AdminAuthenticationPage from './pages/AdminAuthenticationPage';
import Dialog from './components/Dialog';
import ResultMessage from './components/ResultMessage';
import ScrollToTop from './components/ScrollToTop';
import AdminRoute from './components/AdminRoute';
import Messenger from './components/Messenger';

const queryClient = new QueryClient();

const PrivateRoute = ({ component: Component, children, redirect, auth, ...rest }) => {
	return (
		<Route {...rest} render={() =>
			auth() ? children || <Component /> : <Redirect to={{ pathname: redirect }} />
		} />
	);
}

function App() {
	const toastDisplay = useRecoilValue(toastDisplayState);
	const user = useRecoilValue(userState);

	const isLogged = () => {
		if (user.accessToken) return true;
		return false;
	}

	return (
		<Router>
			<ScrollToTop />
			<QueryClientProvider client={queryClient}>
				<div className="App">
					<Navigation />
					<Switch>
						<Route path='/' exact component={HomePage} />
						<Route path='/cart' component={CartPage} />
						<Route path='/category/:category' component={SearchPage} />
						<Route path='/search' component={SearchPage} />
						<Route path='/product/:id' component={ProductDetailPage} />
						<PrivateRoute path='/checkout' component={CheckoutPage} redirect='/' auth={isLogged} />
						<PrivateRoute path='/account' component={AccountInfoPage} redirect='/' auth={isLogged} />
						<Route path='/admin/login' component={AdminAuthenticationPage} />
						<AdminRoute path='/admin' component={DashboardPage} redirect='/admin/login' />
					</Switch>
					<Messenger />
					<ResultMessage />
					<Dialog />
					{toastDisplay.show && <ToastMessage />}
					<Footer />
				</div>
			</QueryClientProvider>
		</Router>
	);
}

export default App;
