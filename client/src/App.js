import './scss/App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
import MessengerCustomerChat from 'react-messenger-customer-chat';
import ToastMessage from './components/ToastMessage';
import ScrollToTop from './components/ScrollToTop';
import AdminAuthenticationPage from './pages/AdminAuthenticationPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dialog from './components/Dialog';
import SuccessMessage from './components/SuccessMessage';

const queryClient = new QueryClient();

const PrivateRoute = ({ children, redirect, auth, ...rest }) => {
	// let auth = localStorage.getItem('jwt');
	return (
		<Route {...rest} render={() =>
			auth() ? children : <Redirect to={{ pathname: redirect }} />
		} />
	);
}

function App() {
	const toastDisplay = useRecoilValue(toastDisplayState);
	const user = useRecoilValue(userState);

	const isLogged = () => {
		if (user.info) return true;
		return false;
	}

	const isAdmin = () => {
		if (user.info && user.info.type === 1) return true;
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
						<Route path='/checkout' component={CheckoutPage} />
						<PrivateRoute path='/account' redirect='/' auth={isLogged}>
							<AccountInfoPage />
						</PrivateRoute>
						<Route path='/admin/login' component={AdminAuthenticationPage} />
						<PrivateRoute path='/admin' redirect='/admin/login' auth={isAdmin}>
							<DashboardPage />
						</PrivateRoute>
						{/* <Route path='/admin'>
						{!loggedIn ? <Redirect to='/admin/login' /> : <DashboardPage />}
						</Route> */}
					</Switch>
					<MessengerCustomerChat pageId="107987698119089" appId="466417401239652" />
					<SuccessMessage />
					<Dialog />
					{toastDisplay.show && <ToastMessage />}
					<Footer />
				</div>
			</QueryClientProvider>
		</Router>
	);
}

export default App;
