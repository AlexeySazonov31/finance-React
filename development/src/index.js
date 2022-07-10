import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
            <Router>
                <CssBaseline>
                    <App/>
                </CssBaseline>
            </Router>
    </React.StrictMode>
);

reportWebVitals();