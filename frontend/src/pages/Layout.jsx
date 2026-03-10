import Sidebar from "../components/Slidebar";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

function Layout() {
  return (
    
    <div className="flex flex-col">
      <Header />
   
      <Sidebar />


      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;