import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageNotFound } from '../pages/PageNotFound.jsx';
import { Home } from '../pages/Home.jsx';
import { Layout } from '../components/Layout/Layout.jsx';

export const Rotas = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>} />
            {/* <Route path="/filme" element={<Filme/>} /> */}
            {/* <Route path="/serie" element={<Serie/>} /> */}
            <Route path="/*" element={<PageNotFound />} />
          </Route>
        </Routes>
    </BrowserRouter>
    );
};

