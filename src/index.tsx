import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import rootReducer from './reducers';
import './index.css';
import reportWebVitals from './reportWebVitals';

const store = createStore(rootReducer);

const rooElement = document.getElementById('root');
if (!rooElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rooElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Provider>,
//   document.getElementById('root'),
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
