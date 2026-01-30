import { Outlet } from "react-router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default function App() {
    return (
        <div className="h-screen flex flex-col">
            <Header/>
            <main className="mx-auto max-w-7xl flex-1 mt-15">
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
}
