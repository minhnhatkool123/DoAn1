import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <App />
      {/* </Suspense> */}
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
