import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
//Page
import MainPage from "./component/page/MainPage";
import EmployeePage from "./component/page/EmployeePage";
//css
import "./component/ui/Common.css"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate replace to="/"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
