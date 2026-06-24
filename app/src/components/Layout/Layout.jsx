import { useRef, useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Footer } from "../Footer/Footer.jsx";
import NotificationPopup from "../NotificationPopup/NotificationPopup.jsx";
import AuthSection from "../Auth/AuthSection.jsx";

function Layout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const authMode = searchParams.get("auth");
   const dialogRef = useRef(null);

  const handleClose = () => {
    dialogRef.current?.close();
    setSearchParams({});
  };

   useEffect(() => {
    if (authMode && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!authMode && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [authMode]);

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
       <dialog ref={dialogRef} className="auth-dialog" onClose={handleClose}>
        <AuthSection onClose={handleClose} />
      </dialog>
    </div>
  );
}

export default Layout;
