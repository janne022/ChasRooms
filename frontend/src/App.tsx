import { Outlet } from "react-router";

export default function App() {
    return (
        <div className="h-screen">
            <header> Header </header>
            <main className="mx-auto max-w-7xl">
                <Outlet />
            </main>
            <footer> Footer </footer>
        </div>
    );
}
