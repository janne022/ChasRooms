import logo from "@assets/images/piglinhead.webp";
import { Link } from "react-router";

const Header = () => {
    return (
        <div className="fixed left-1/2 z-50 m-2 flex w-[95%] max-w-5xl -translate-x-1/2 items-center justify-between gap-2 rounded-2xl border bg-white p-2">
            <div className="flex items-center">
                <img className="w-7" src={logo} />
                <h3>Piglin Brutes</h3>
            </div>
            <Link to="/my-bookings"> Mina bookingar </Link>
        </div>
    );
};

export default Header;
