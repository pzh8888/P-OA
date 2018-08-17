import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import './stylesheets/main.scss'

import { Provider } from 'react-redux'
import store from './store'

import './modules/config'

import Router from './Router'

ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
