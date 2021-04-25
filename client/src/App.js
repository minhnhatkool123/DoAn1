import logo from './logo.svg';
import './App.css';
import './kool.scss';
import './qwe.scss';
import './lp.scss';

function App() {
	return (
		<div className="App">
			<header className="App-header">
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
