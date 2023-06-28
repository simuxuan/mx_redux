import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// 内部就是Provider.context
import { Provider } from "react-redux"
import store from "./store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    // 内部就是value封装成了store，将store传递下去
    <Provider store={store}>
        <App />
    </Provider>
    // </React.StrictMode>
);