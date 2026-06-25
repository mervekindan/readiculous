import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Footer } from "../Footer/Footer.jsx";
import NotificationPopup from "../NotificationPopup/NotificationPopup.jsx";

function Layout() {
  return (
    <div className="layout">
      <NotificationPopup />

      <NavBar />

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
