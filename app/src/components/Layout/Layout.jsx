import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Footer } from "../Footer/Footer.jsx";

function Layout() {
    return (
        <div className="layout">
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
