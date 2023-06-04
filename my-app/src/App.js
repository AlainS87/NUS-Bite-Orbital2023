import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { HomeScreen } from "./component/HomeScreen";
import { Login } from "./component/loginScreen";
import { Main } from "./component/MainSreen";
import { HawkerLogin } from "./component/hawkerLogin";
import { HawkerMain } from "./component/hawkerMainScreen";
import { VisitorMain } from "./component/visitorMainScreen";

export default function App() {
    return (
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/login/mainScreen" element={<Main />}></Route>
        <Route path="/HawkerLogin/HawkerMain" element={<HawkerMain />}></Route>
        <Route path="/HawkerLogin" element={<HawkerLogin />}></Route>
        <Route path="/VisitorMain" element={<VisitorMain />}></Route>
      </Routes>
    );
}
