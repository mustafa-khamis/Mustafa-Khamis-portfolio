import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StartProjectPage from './pages/StartProject/StartProjectPage';
import ScrollToHash from './components/ScrollToHash';
import PortfolioChatbot from './components/chatbot/PortfolioChatbot';

function App() {
  return (
    <>
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/startproject" element={<StartProjectPage />} />
      </Routes>

      <PortfolioChatbot />
    </>
  );
}

export default App;
