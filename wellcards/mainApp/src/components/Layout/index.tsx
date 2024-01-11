import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Header from "../Header";
import "./Layout.scss";

export default function Layout() {
  return (
    <>
      <div className='container'>
        <Header />
        <div className='layout'>
          <Navbar />
          <div className='page-wrapper'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
