import { Outlet } from "react-router";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import Toast from "@components/ui/Toast";

export default function App() {
    return (
        <>
            <div className="flex h-screen flex-col">
                <Header />
                <main className="mx-auto mt-15 max-w-7xl flex-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
            <Toast />
        </>
    );
}
