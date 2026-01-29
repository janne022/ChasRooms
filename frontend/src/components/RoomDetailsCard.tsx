import { UsersIcon } from "lucide-react";
import RoomEqupmentList from "./RoomEqupmentList";
import Button from "./ui/Button";
import { useState } from "react";
import BookingModal from "./room/BookingModal";
import { Toast } from "./ui/Toast";

type RoomDetailsCardProps = {
    preview: string;
    name: string;
    isAvailable: boolean;
    peopleNumber: number;
    equipment: string[];
};

export default function RoomDetailsCard({
    preview,
    name,
    isAvailable,
    peopleNumber,
    equipment,
}: RoomDetailsCardProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [toast, setToast] = useState<{
        open: boolean;
        message: string;
        type?: "success" | "error";
    }>({
        open: false,
        message: ''
    })


    const showToast = (message: string, type: "success" | "error" = "success", duration = 3000) => {
        setToast({ open: true, message, type });
        setTimeout(() => setToast(prev => ({ ...prev, open: false })), duration);
    };
    return (
        <article>
            <img className="w-full" src={preview} alt="" />

            <div className="grid gap-y-4">
                <div className="flex justify-between">
                    <h2>{name}</h2> <span>{isAvailable}</span>
                </div>

                <span className="flex items-center gap-x-2">
                    <UsersIcon />
                    {peopleNumber} People
                </span>

                <div>
                    <h3>Resurser: </h3>
                    <RoomEqupmentList equipment={equipment} />
                </div>
            </div>

            <Button onClick={() => setIsOpen(true)}> Boka Rum </Button>
            <Button> Visa på kartan </Button>
            <BookingModal 
                isOpen={isOpen} 
                onCancel={() => setIsOpen(false)} 
                roomId={1}
                roomName="Sun"
                showToast={showToast}
            />
            <Toast
                open={toast.open}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(prev => ({ ...prev, open: false }))}
            />
        </article>
    );
}
