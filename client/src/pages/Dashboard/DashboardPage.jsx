import React from 'react';
import { Route, Routes } from "react-router-dom";

import "./styles.scss";

import Header from './Header';
import BoardsPage from '../Boards/BoardsPage';
import BoardPage from '../Board/BoardPage';

const DashboardPage = () => {
  return (
    <div>
        <Header />
        <div className='main_body'>
          <Routes>
            <Route path="/" element={<BoardsPage />} />
            <Route path="board/:id" element={<BoardPage />} />
          </Routes>
        </div>
    </div>
  )
}

export default DashboardPage;