import { UsersIcon } from "lucide-react";
import RoomResourceList from "@components/room/RoomResourceList";
import Button from "@components/ui/Button";
import roomPreviewPlaceholder from "@assets/images/room-preview-placeholder.png";
import StatusBadge from "./StatusBadge";
import { isBuildingMapOpenAtom, tokenAtom } from "@lib/atoms";
import { getRoomById } from "@/services/api";
import { useAtomValue, useSetAtom } from "jotai";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import BookingModal from "./BookingModal";
import { useState } from "react";

export default function RoomDetailsCard() {
    const { id } = useParams();
    const token = useAtomValue(tokenAtom);
    const setIsBuildingMapOpen = useSetAtom(isBuildingMapOpenAtom);
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

    const [isOpen, setIsOpen] = useState(false);

    const showToast = (
        message: string,
        type: "success" | "error" = "success",
        duration = 3000,
    ) => {
        setToast({ open: true, message, type });
        setTimeout(
            () => setToast((prev) => ({ ...prev, open: false })),
            duration,
        );
    };

    if (isPending) {
        return <div> Laddar ... </div>;
    }

    if (isError) {
        return <div> Fel vid hämtning av rum {id} </div>;
    }

    const status = !room?.isOccupied ? "occupied" : "available";

    return (
        <article className="card grid">
            <img
                className="cardImg"
                src={room?.previewUrl || roomPreviewPlaceholder}
                alt=""
            />

            <div className="relative grid gap-y-4 p-4">
                <h2> {room?.name} </h2>
                <StatusBadge status={status} />

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

            <div className="grid gap-2 p-2">
                <Button
                    onClick={() => setIsOpen(true)}
                    className="default-bg p-2"
                >
                    {" "}
                    Boka Rum{" "}
                </Button>
                <Button
                    className="rounded-2xl border p-2"
                    onClick={() => {
                        console.log("building map open");
                        setIsBuildingMapOpen(true);
                    }}
                >
                    Visa på kartan
                </Button>
            </div>
            <BookingModal
                isOpen={isOpen}
                onCancel={() => setIsOpen(false)}
                roomId={room?.id ?? 1}
                roomName="Sun"
                showToast={showToast}
            />
        </article>
    );
}
