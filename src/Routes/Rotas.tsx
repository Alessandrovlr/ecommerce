import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeCompleta from '../pages/homeCompleta.jsx';



export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeCompleta />} />
            </Routes>
        </BrowserRouter>
    );
};
