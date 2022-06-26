import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';

import './styles/reset.css';
import './styles/style.css';

ReactDOM.render(
    <React.StrictMode>
            <Router>
                <App/>
            </Router>
    </React.StrictMode>, document.getElementById('root')
);

reportWebVitals();