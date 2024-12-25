import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex  justify-between flex-col flex-grow ">
        
      <Header></Header>
    <div  className="flex justify-center m-8 p-4">
      
        <Outlet /> {/* Placeholder for the body content */}
      
    </div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;