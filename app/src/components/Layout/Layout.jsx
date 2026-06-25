import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Footer } from "../Footer/Footer.jsx";
import NotificationPopup from "../NotificationPopup/NotificationPopup.jsx";
import AuthModal from "../Auth/AuthSection.jsx";

function Layout() {
  return (
    <div className="layout">
      <NotificationPopup />
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}

export default Layout;
