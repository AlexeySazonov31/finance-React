import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import News from "../pages/News";
import Сryptocurrency from "../pages/Cryptocurrency";
import Currencies from "../pages/Currencies";
import Error from '../pages/Error/Error';

import CoinPage from './CoinRoutes';
import { ErrorProvider } from '../pages/Error/ErrorContext';


function AppRoutes() {

    return (
        <ErrorProvider>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/news' element={<News />} />
            <Route path='/crypto' element={<Сryptocurrency />} />
            <Route path='/crypto/:idcoin' element={<CoinPage setError={() => {}} />} />
            <Route path='/currencies' element={<Currencies />} />
            <Route path='/error' element={<Error />} />
            <Route path='/*' element={<Navigate to="/error" />} />
        </Routes>
        </ErrorProvider>
    )
}

export default AppRoutes;
