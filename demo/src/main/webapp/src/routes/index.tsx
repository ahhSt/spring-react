import React from "react";

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from '../pages';

import DefaultLayout from 'layout';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* case1. MainPage Component가 DefaultLayout Cmoponent의 <Outlet/>로 삽입된다.(children값은 undefined) */}
        <Route element={<DefaultLayout/>}>
          <Route index element={<MainPage/>}/>
        </Route>
        {/* case2. MainPage Component가 DefaultLayout Componet의 children으로 삽입된다.*/}
        <Route path="/main" element={<DefaultLayout><MainPage/></DefaultLayout>}/>
      </Routes>
    </BrowserRouter>
  )
}