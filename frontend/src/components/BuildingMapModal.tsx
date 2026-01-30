import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { useAtom } from "jotai";
import { isBuildingMapOpenAtom } from "@/lib/atoms";
import buildingMap from "@assets/images/building-map.svg";
import { X } from "lucide-react";

export default function BuildingMapModal() {
    const [isBuildingMapOpen, setIsBuildingMapOpen] = useAtom(
        isBuildingMapOpenAtom,
    );

    return (
        <Dialog
            open={isBuildingMapOpen}
            onClose={() => setIsBuildingMapOpen(false)}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>{" "}
            {/* backdrop */}
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="grid max-w-3xl gap-y-2 rounded-xl border border-gray-200 bg-white p-12">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="font-bold">
                            Chas Academy
                        </DialogTitle>
                        <button
                            className="cursor-pointer"
                            onClick={() => setIsBuildingMapOpen(false)}
                        >
                            <span className="sr-only">Dölj byggnadsplanen</span>
                            <X />
                        </button>
                    </div>
                    <Description>
                        Alla rum i skolan är markerade med grönt med siffta i
                        mitten.
                    </Description>

                    <img src={buildingMap} alt="Chas Academy building plan" />
                </DialogPanel>
            </div>
        </Dialog>
    );
}
