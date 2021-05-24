import './scss/App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { toastDisplayState } from './recoil/toastDisplayState';
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
import CartPreviewDisplayHandling from './components/CartPreviewDisplayHandling';

const PrivateRoute = ({ children, ...rest }) => {
	let auth = localStorage.getItem('name');

	return (
		<Route {...rest} render={({location}) =>
			auth ? children : <Redirect to={{ pathname: location.pathname + '/login' }} />
		} />
	);
}

function App() {
	const toastDisplay = useRecoilValue(toastDisplayState);
	const loggedIn = localStorage.getItem('name');

	return (
		<Router>
			<ScrollToTop />
			<CartPreviewDisplayHandling />
			<div className="App">
				<Navigation />
				<Switch>
					<Route path='/' exact component={HomePage} />
					<Route path='/cart' component={CartPage} />
					<Route path='/category/:category' component={SearchPage} />
					<Route path='/search' component={SearchPage} />
					<Route path='/product/:id' component={ProductDetailPage} />
					<Route path='/account' component={AccountInfoPage} />
					<Route path='/checkout' component={CheckoutPage} />
					<Route path='/admin/login' component={AdminAuthenticationPage} />
					<PrivateRoute path='/admin'>
						<DashboardPage />
					</PrivateRoute>
					{/* <Route path='/admin'>
						{!loggedIn ? <Redirect to='/admin/login' /> : <DashboardPage />}
					</Route> */}
				</Switch>
				<MessengerCustomerChat pageId="107987698119089" appId="466417401239652" />
				{toastDisplay.show && <ToastMessage />}
				<Footer />
			</div>
		</Router>
	);
}

export default App;
