import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageNotFound } from '../pages/PageNotFound.jsx';
import { Home } from '../pages/Home.jsx';
import { Layout } from '../components/Layout/Layout.jsx';
import { Login } from '../pages/Login.jsx';
import { AdminPage } from '../components/private/AdminPage.jsx';
import { CadastroProdutos } from '../pages/cadastroProdutos.jsx';

export const Rotas = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/cadastroProdutos" element={<AdminPage children={<CadastroProdutos/>}/>} />
            <Route path="/*" element={<PageNotFound />} />
          </Route>
        </Routes>
    </BrowserRouter>
    );
};

