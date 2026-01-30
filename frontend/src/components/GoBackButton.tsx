import { useLocation, useNavigate } from "react-router";
import Button from "./ui/Button";
import { ArrowLeft } from "lucide-react";

export default function GoBackButton() {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    return (
        <Button
            className="flex items-center"
            onClick={() => navigate(from, { replace: true })}
        >
            <ArrowLeft className="size-4" />
            <span> Gå tillbaka </span>
        </Button>
    );
}
