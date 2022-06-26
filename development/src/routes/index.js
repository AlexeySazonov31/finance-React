import { Routes, Route, Navigate } from 'react-router-dom';

import Home from "../pages/Home";
import Сryptocurrency from "../pages/Cryptocurrency";
import Stock from "../pages/Stock";
import Currencies from "../pages/Currencies";
import Nft from "../pages/Nft";
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
            <Route path='/' element={<Home />} />
            <Route path='/cryptocurrency' element={<Сryptocurrency />} />
            <Route path='/stock' element={<Stock/>} />
            <Route path='/currencies' element={<Currencies />} />
            <Route path="/nft" element={<Nft />} />

            <Route path='/not-found-404' element={<NotFound />} />
            <Route path='*' element={<Navigate to="/not-found-404" />} />

        </Routes>
    )
}

export default AppRoutes;

