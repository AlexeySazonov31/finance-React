<<<<<<< HEAD
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
=======
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
>>>>>>> 61e0f10 (detailed chart currecy)

import News from "../pages/News";
import Сryptocurrency from "../pages/Cryptocurrency";
import Currencies from "../pages/Currencies";
import NotFound from "../pages/NotFound";

import Coin from "../pages/Cryptocurrency/Coin";
<<<<<<< HEAD


function AppRoutes() {
    const location = useLocation();
=======
import { useState, useEffect } from 'react';

function CoinPage() {

    let { id } = useParams();

    return <Coin id={id} />

}

function AppRoutes() {

    const location = useLocation();


>>>>>>> 61e0f10 (detailed chart currecy)
    return (
        <Routes>
            <Route path='/news' element={<News />} />
            <Route path='/' element={<Сryptocurrency />} />
            <Route path='/currencies' element={<Currencies />} />
<<<<<<< HEAD
            <Route path='/coin/*' element={<Coin />} />
=======
            <Route path='/coin/:id' element={<CoinPage />} />
>>>>>>> 61e0f10 (detailed chart currecy)

            <Route path='/not-found-404' element={<NotFound />} />
            <Route path='/*' element={<Navigate to="/not-found-404" />} />

        </Routes>
    )
}

export default AppRoutes;

