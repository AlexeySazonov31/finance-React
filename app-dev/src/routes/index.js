
import { Routes, Route, Navigate, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import News from "../pages/News";
import Сryptocurrency from "../pages/Cryptocurrency";
import Currencies from "../pages/Currencies";
import NotFound from "../pages/NotFound";

import Coin from "../pages/Cryptocurrency/Coin";



function CoinPage() {
    const navigate = useNavigate();

    let { idcoin } = useParams();

    const [dataCoin, setDataCoin] = useState(null);

    useEffect(() => {
        fetch(
            `https://api.coingecko.com/api/v3/coins/${idcoin}`
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
    const location = useLocation();

    return (
        <Routes>
            <Route path='/news' element={<News />} />
            <Route path='/' element={<Сryptocurrency />} />
            <Route path='/currencies' element={<Currencies />} />

            <Route path='/coin/:idcoin' element={<CoinPage />} />

            <Route path='/not-found-404' element={<NotFound />} />
            <Route path='/*' element={<Navigate to="/not-found-404" />} />

        </Routes>
    )
}

export default AppRoutes;
