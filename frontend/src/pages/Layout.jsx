import Sidebar from "../components/Slidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex">
      {/* 👇 Sidebar hamesha visible rahega */}
      <Sidebar />

      {/* 👇 Yahan pages change honge */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;