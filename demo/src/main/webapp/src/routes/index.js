import React from "react";

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from '../pages';

import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { TestPage } from '../pages/TestPage';
import { NoMatch } from '../pages/NoMatch';
import ListInfoSample from '../pages/sample/listInfoSample';
import ListInfoSampleMybatis from '../pages/sample/listInfoSample_mybatis';
import DetailViewSample from '../pages/sample/detailViewSample';
import UploadFile from '../pages/sample/uploadFile';
import Menu from '../pages/sample/menu';
import User from '../pages/sample/user';

export default function Router() {
  return (
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<TestPage />} />
        <Route path="orders" element={<About />} />
        <Route path="list-info" element={<ListInfoSample />} />
        <Route path="list-info-mybatis" element={<ListInfoSampleMybatis />} />
        <Route path="detail-view" element={<DetailViewSample />} />
        <Route path="upload-file" element={<UploadFile />} />
        <Route path="menu" element={<Menu />} />
        <Route path="users" element={<User />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
  )
}