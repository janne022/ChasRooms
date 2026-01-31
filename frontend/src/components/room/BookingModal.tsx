import { useState } from "react";
import { useAtomValue, useAtom } from "jotai";
import { isBookingModalOpenAtom, tokenAtom } from "@/lib/atoms";
import { createBooking } from "@/services/api";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Field,
    Fieldset,
    Input,
    Label,
} from "@headlessui/react";
import Button from "@components/ui/Button";
import type { Booking, BookingForm } from "@/types/booking";
import { useToast } from "@/hooks/useToast";

interface BookingModalProps {
    roomId: number;
    roomName: string;
}

// TODO: Add react hook form + validation with zod
export default function BookingModal({ roomId, roomName }: BookingModalProps) {
    const [booking, setBooking] = useState<BookingForm>({
        date: "",
        from: "",
        to: "",
        description: "",
    });
    const token = useAtomValue(tokenAtom);
    const [isBookingModalOpen, setIsBookingModalOpen] = useAtom(
        isBookingModalOpenAtom,
    );
    const { show } = useToast();

    const handleBooking = async () => {
        const startDateTime = new Date(`${booking.date}T${booking.from}`);
        const endDateTime = new Date(`${booking.date}T${booking.to}`);
        const formattedBooking: Booking = {
            startTime: startDateTime.toISOString(),
            endTime: endDateTime.toISOString(),
            roomId,
            name: roomName,
            description: booking.description,
        };

        const response = await createBooking(formattedBooking, token);

        if (response.error) {
            show(response.error, "error");
            return;
        }

        show("Booking confirmed! 🎉", "success");
        setIsBookingModalOpen(false);
    };

    return (
        <>
            <Dialog
                open={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                className="relative z-50"
            >
                {/* backdrop */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex w-screen items-center justify-center">
                    <DialogPanel className="w-[80%] max-w-3xl space-y-4 rounded-2xl border bg-white p-7">
                        <DialogTitle className="my-0.5 text-xl font-bold">
                            Boka rum {roomId}
                        </DialogTitle>
                        <Fieldset>
                            <Field className="m-2">
                                <Label className="block">Datum</Label>
                                <Input
                                    className="default-bg mt-2 block w-full"
                                    type="date"
                                    value={booking.date}
                                    onChange={(e) =>
                                        setBooking({
                                            ...booking,
                                            date: e.target.value,
                                        })
                                    }
                                />
                            </Field>
                            <div className="flex">
                                <Field className="m-1 w-1/2">
                                    <Label className="block">Från</Label>
                                    <Input
                                        className="default-bg mt-2 block"
                                        type="time"
                                        value={booking.from}
                                        onChange={(e) =>
                                            setBooking({
                                                ...booking,
                                                from: e.target.value,
                                            })
                                        }
                                    />
                                </Field>
                                <Field className="m-2 w-1/2">
                                    <Label className="block">Till</Label>
                                    <Input
                                        className="default-bg mt-2 block"
                                        type="time"
                                        value={booking.to}
                                        onChange={(e) =>
                                            setBooking({
                                                ...booking,
                                                to: e.target.value,
                                            })
                                        }
                                    />
                                </Field>
                            </div>
                            <Field className="m-2">
                                <Label className="block">Description</Label>
                                <Input
                                    className="default-bg mt-2 block w-full"
                                    type="text"
                                    value={booking.description}
                                    onChange={(e) =>
                                        setBooking({
                                            ...booking,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </Field>
                        </Fieldset>
                        <Button
                            className="default-bg w-full"
                            onClick={handleBooking}
                            disabled={
                                !booking.date || !booking.from || !booking.to
                            }
                        >
                            Confirm Booking
                        </Button>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
