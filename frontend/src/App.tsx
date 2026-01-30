import { Outlet } from "react-router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default function App() {
    return (
        <div className="min-h-screen">
            <header> Header </header>
            <main className="mx-auto min-h-screen w-[95%] max-w-7xl">
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
}
