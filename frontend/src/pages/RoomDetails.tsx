import { tokenAtom } from "@/lib/atoms";
import { getRoomById } from "@/services/api";
import { useAtomValue } from "jotai";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import RoomDetailsCard from "@/components/room/RoomDetailsCard";
import Button from "@/components/ui/Button";
import { List } from "lucide-react";

export default function RoomDetails() {
    const { id } = useParams();
    const token = useAtomValue(tokenAtom);
    const {
        data: room,
        isPending,
        isError,
    } = useQuery({
        queryFn: async () => {
            if (!id) return;
            return await getRoomById(token, id);
        },
        queryKey: ["rooms", id],
        enabled: !!token,
    });

    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    if (isPending) {
        return <div> Laddar ... </div>;
    }

    if (isError) {
        return <div> Fel vid hämtning av rum {id} </div>;
    }

    return <>{room && 
        <div>
            <Button onClick={handleBack} className="m-1"> {"<- Gå tillbaka"}</Button>
            <div className="p-5">
                <RoomDetailsCard />
                <div className="card">
                    <List>
                        {room.bookings.map((booking) => (
                            <p>{`${booking.start.getDate()}: ${booking.start.getTime()}-${booking.start.getTime()}`}</p>
                        ))}
                    </List>
                </div>
            </div>
        </div>
    }</>;
}
