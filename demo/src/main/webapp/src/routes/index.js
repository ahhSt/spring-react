import React from "react";

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from '../pages';

import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { TestPage } from '../pages/TestPage';
import { NoMatch } from '../pages/NoMatch';
import ListInfoSample from '../pages/sample/listInfoSample';
import SearchSample from '../pages/sample/searchSample';
import ListInfoSampleJH from '../pages/sample/sampleJH';
import Term from '../pages/meta/term';
import DomainManagement from '../pages/meta/domain';
import WordManagement from '../pages/meta/word';
import CapitalLetter from '../pages/meta/testJH';
import TestJH2Domain from '../pages/meta/testJH2Domain';
import TestJH3 from '../pages/meta/testJH3';

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
        <Route path="/term" element={<Term />} />
        <Route path="/list-info-JH" element={<ListInfoSampleJH />} />
        <Route path="/word-management" element={<WordManagement />} />
        <Route path="/domain-management" element={<DomainManagement />} />
        <Route path="/testJHv" element={<CapitalLetter />} />
        <Route path="/testJH_Domain" element={<TestJH2Domain />} />
        <Route path="/testJH3" element={<TestJH3 />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
  )
}