import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import React, { useEffect, useState } from "react";
import AppBar from './components/AppBar';

function App() {
   const [tab, setTab] = useState("register");
  const changeTabs = (name) => {
    setTab(name);
  };
  return (
    <>
       <AppBar changeTabs={changeTabs} />
    <Dashboard tab={tab}/>
    </>
  );
}

export default App;
