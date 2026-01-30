import { UsersIcon } from "lucide-react";
import RoomResourceList from "@components/room/RoomResourceList";
import Button from "@components/ui/Button";
import roomPreviewPlaceholder from "@assets/images/room-preview-placeholder.png";
import StatusBadge from "./StatusBadge";
import { tokenAtom } from "@/lib/atoms";
import { getRoomById } from "@/services/api";
import { useAtomValue } from "jotai";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

export default function RoomDetailsCard() {
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

    if (isPending) {
        return <div> Laddar ... </div>;
    }

    if (isError) {
        return <div> Fel vid hämtning av rum {id} </div>;
    }

    const status = room?.isOccupied ? "available" : "occupied";

    return (
        <article className="grid">
            <img
                className="aspect-4/1 w-full object-cover"
                src={room?.previewUrl || roomPreviewPlaceholder}
                alt=""
            />

            <div className="grid gap-y-4">
                <h2> {room?.previewUrl} </h2>
                <StatusBadge status={status} className="justify-self" />

                <span className="flex items-center gap-x-2">
                    <UsersIcon />
                    {room?.capacity} Pers
                </span>

                <div>
                    <h3>Resurser: </h3>
                    {room?.resources && (
                        <RoomResourceList resources={room.resources} />
                    )}
                </div>
            </div>

            <div className="grid">
                <Button> Boka Rum </Button>
                <Button variant="secondary">Visa på kartan</Button>
            </div>
        </article>
    );
}
