import logo from './logo.svg';
import './App.css';
import './kool.scss';
import './qwe.scss';
import './lp.scss';

import GoogleLogin from 'react-google-login';
import axios from 'axios';

function App() {
	const responseSuccessGoogle = (res) => {
		console.log(res);
		axios({
			method: 'POST',
			url: 'http://localhost:5000/user/login-google',
			data: { tokenId: res.tokenId },
		}).then((res) => {
			console.log(res);
		});
	};

	const responseErrorGoogle = (res) => {};

	return (
		<div className="App">
			<header className="App-header">
				<GoogleLogin
					clientId="941926115379-6cbah41jf83kjm236uimrtjdr62t7k71.apps.googleusercontent.com"
					buttonText="Login with gg"
					onSuccess={responseSuccessGoogle}
					onFailure={responseErrorGoogle}
					cookiePolicy={'single_host_origin'}
				/>

				<img src={logo} className="App-logo" alt="logo" />
				<p className="lp">minhnhat</p>
				<p className="qwe">dasdsadsa</p>
				<p className="kool">
					Akool <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
