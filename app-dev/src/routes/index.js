<<<<<<< HEAD
<<<<<<< HEAD
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
=======
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
>>>>>>> 61e0f10 (detailed chart currecy)
=======
import { Routes, Route, Navigate, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
>>>>>>> 665c049 (stable version)

import News from "../pages/News";
import Сryptocurrency from "../pages/Cryptocurrency";
import Currencies from "../pages/Currencies";
import NotFound from "../pages/NotFound";

import Coin from "../pages/Cryptocurrency/Coin";
<<<<<<< HEAD
<<<<<<< HEAD


function AppRoutes() {
    const location = useLocation();
=======
import { useState, useEffect } from 'react';
=======
>>>>>>> 665c049 (stable version)

function CoinPage() {
    const navigate = useNavigate();

    let { idcoin } = useParams();

    const [dataCoin, setDataCoin] = useState(null);

    useEffect(() => {
        fetch(
            `https://api.coingecko.com/api/v3/coins/${idcoin}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
        )
            .then((res) => res.json())
            .then((data) => {
                data.hasOwnProperty("error")
                    ? navigate("/not-found-404")
                    : console.log(data);
                setDataCoin(data);
            });
    }, []);
    return <Coin data={dataCoin} id={idcoin} />
}


function AppRoutes() {
<<<<<<< HEAD

    const location = useLocation();


>>>>>>> 61e0f10 (detailed chart currecy)
=======
>>>>>>> 665c049 (stable version)
    return (
        <Routes>
            <Route path='/news' element={<News />} />
            <Route path='/' element={<Сryptocurrency />} />
            <Route path='/currencies' element={<Currencies />} />
<<<<<<< HEAD
<<<<<<< HEAD
            <Route path='/coin/*' element={<Coin />} />
=======
            <Route path='/coin/:id' element={<CoinPage />} />
>>>>>>> 61e0f10 (detailed chart currecy)
=======
            <Route path='/coin/:idcoin' element={<CoinPage />} />
>>>>>>> 665c049 (stable version)

            <Route path='/not-found-404' element={<NotFound />} />
            <Route path='/*' element={<Navigate to="/not-found-404" />} />

        </Routes>
    )
}

export default AppRoutes;
