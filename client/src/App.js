import './scss/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { toastDisplayState } from './recoil/toastDisplayState';
import HomePage from './pages/HomePage';
import AccountInfoPage from './pages/AccountInfoPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import ToastMessage from './components/ToastMessage';

function App() {
	const toastDisplay = useRecoilValue(toastDisplayState);

	return (
		<Router>
			<div className="App">
				<Navigation />
				<Switch>
					<Route path='/' exact component={HomePage} />
					<Route path='/cart' component={CartPage} />
					<Route path='/category/:name' component={SearchPage} />
					<Route path='/product/:id' component={ProductDetailPage} />
					<Route path='/account' component={AccountInfoPage} />
				</Switch>
				<MessengerCustomerChat pageId="107987698119089" appId="466417401239652" />
				{toastDisplay.show && <ToastMessage />}
				<Footer />
			</div>
		</Router>
	);
}

export default App;
