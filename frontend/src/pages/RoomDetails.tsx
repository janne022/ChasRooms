import { tokenAtom } from "@/lib/atoms";
import { getRoomById } from "@/services/api";
import { useAtomValue } from "jotai";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import RoomDetailsCard from "@/components/room/RoomDetailsCard";

import RoomBookingsList from "@/components/room/RoomBookingList";
import GoBackButton from "@/components/GoBackButton";
import BuildingMapModal from "@/components/BuildingMapModal";

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

    if (isPending) {
        return <div> Laddar ... </div>;
    }

    if (isError) {
        return <div> Fel vid hämtning av rum {id} </div>;
    }

    return (
        <>
            {room && (
                <div>
                    <GoBackButton />
                    <div className="p-5">
                        <RoomDetailsCard />
                        <RoomBookingsList bookings={room?.bookings} />
                    </div>
                    <BuildingMapModal />
                </div>
            )}
        </>
    );
}
