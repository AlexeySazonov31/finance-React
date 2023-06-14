
import { Routes, Route, Navigate, useLocation, useParams, useNavigate } from 'react-router-dom';

import News from "../pages/News";
import Сryptocurrency from "../pages/Cryptocurrency";
import Currencies from "../pages/Currencies";
import NotFound from "../pages/NotFound";
import Error from '../pages/Error/Error';

import CoinPage from './CoinRoutes';

function AppRoutes() {
    const location = useLocation();

    return (
        <Routes>
            <Route exact path='/' element={<Сryptocurrency />} />
            <Route path='/news' element={<News />} />
            <Route path='/currencies' element={<Currencies />} />
            <Route path='/coin/:idcoin' element={<CoinPage />} />
            <Route path='/error' element={<Error />} />
            <Route path='/not-found-404' element={<NotFound />} />
            <Route path='/*' element={<Navigate to="/not-found-404" />} />
        </Routes>
    )
}

export default AppRoutes;
