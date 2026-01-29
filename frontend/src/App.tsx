import { Outlet } from "react-router";

export default function App() {
    return (
        <main>
            <header> Header </header>
            <div className="mx-auto max-w-2xl">
                <Outlet />
            </div>
            <footer> Footer </footer>
        </main>
    );
}
