import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import News from "../pages/News";
import Сryptocurrency from "../pages/Cryptocurrency";
import Currencies from "../pages/Currencies";
import NotFound from "../pages/NotFound";

import Coin from "../pages/Cryptocurrency/Coin";


function AppRoutes() {
    const location = useLocation();
    return (
        <Routes>
            <Route path='/news' element={<News />} />
            <Route path='/' element={<Сryptocurrency />} />
            <Route path='/currencies' element={<Currencies />} />
            <Route path='/coin/*' element={<Coin id={location.pathname.replace(/\/coin\//, '')}/>} />

            <Route path='/not-found-404' element={<NotFound />} />
            <Route path='/*' element={<Navigate to="/not-found-404" />} />

        </Routes>
    )
}

export default AppRoutes;

