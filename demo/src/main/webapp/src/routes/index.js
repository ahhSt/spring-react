import React from "react";

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from '../pages';

import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { TestPage } from '../pages/TestPage';
import { NoMatch } from '../pages/NoMatch';
import ListInfoSample from '../pages/sample/listInfoSample';
import SearchSample from '../pages/sample/searchSample';

export default function Router() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/dashboard" element={<TestPage />} />
        <Route path="/orders" element={<About />} />
        <Route path="/list-info" element={<ListInfoSample />} />
        <Route path="/filter-sample" element={<SearchSample />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
  )
}