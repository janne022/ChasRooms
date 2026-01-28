import { Outlet } from "react-router";

export default function App() {
    return (
        <main>
            <header> Header </header>
            <Outlet />
            <footer> Footer </footer>
        </main>
    );
}
