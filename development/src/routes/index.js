import { Routes, Route, Navigate } from 'react-router-dom';

import News from "../pages/News";
import Сryptocurrency from "../pages/Cryptocurrency";
import Currencies from "../pages/Currencies";
import NotFound from "../pages/NotFound";

/*
import {
    CircularProgress,
    Container,
    Grid,
} from "@mui/material";
*/

function AppRoutes() {
    return (
        <Routes>
            <Route path='/news' element={<News />} />
            <Route path='/' element={<Сryptocurrency />} />
            <Route path='/currencies' element={<Currencies />} />

            <Route path='/not-found-404' element={<NotFound />} />
            <Route path='*' element={<Navigate to="/not-found-404" />} />

        </Routes>
    )
}

export default AppRoutes;

