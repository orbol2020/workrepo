import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import User from "./Pages/User";
import Service from "./Pages/Service";
import Settings from "./components/Settings";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Theartical from "./Pages/Theartical";
import BusinessInsight from "./Pages/BusinessInsight";

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <BrowserRouter>
      <Header />
      <div className="mt-[4rem]">
        <div className="w-64 fixed">
          <SideNav selectedIndex={(val) => setSelectedIndex(val)} />
        </div>
        <div className="ml-64">
          <div className="md:col-span-2 border min-h-screen shadow-sm p-5">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/service" element={<Service />} />
              <Route path="/service/theartical" element={<Theartical />} />
              <Route path="/service/businessInsight" element={<BusinessInsight />} />
              <Route path="/users" element={<User />} />
              <Route
                path="/"
                element={
                  <>
                    {selectedIndex === 0 && <Service />}
                    {selectedIndex === 1 && <User />}
                    {selectedIndex === 2 && <Settings />}
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
