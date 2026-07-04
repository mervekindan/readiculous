import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Footer } from "../Footer/Footer.jsx";
import NotificationPopup from "../NotificationPopup/NotificationPopup.jsx";
import AuthModal from "../Auth/AuthModal.jsx";
import Loader from "../Loader/Loader.jsx";

function Layout() {
  return (
    <div className="layout">
      <Loader />
      <NotificationPopup />

      <NavBar />

      <main>
        <Outlet />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}

export default Layout;
