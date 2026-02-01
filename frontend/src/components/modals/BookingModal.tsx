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
import type { Booking } from "@/types/booking";
import { useToast } from "@/hooks/useToast";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface BookingModalProps {
    roomId: number;
    roomName: string;
}

const BookingFormSchema = z.object({
    date: z.string().min(1, "Date is required"),
    from: z.string().min(1, "Start time is required"),
    to: z.string().min(1, "End time is required"),
    description: z.string(),
});

type BookingFormFields = z.infer<typeof BookingFormSchema>;

export default function BookingModal({ roomId, roomName }: BookingModalProps) {
    const token = useAtomValue(tokenAtom);
    const [isBookingModalOpen, setIsBookingModalOpen] = useAtom(
        isBookingModalOpenAtom,
    );
    const { show } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<BookingFormFields>({
        resolver: zodResolver(BookingFormSchema),
        defaultValues: {
            date: "",
            from: "",
            to: "",
            description: "",
        },
    });

    const onSubmit: SubmitHandler<BookingFormFields> = async (data) => {
        const startDateTime = new Date(`${data.date}T${data.from}`);
        const endDateTime = new Date(`${data.date}T${data.to}`);
        const formattedBooking: Booking = {
            startTime: startDateTime.toISOString(),
            endTime: endDateTime.toISOString(),
            roomId,
            name: roomName,
            description: data.description,
        };

        const response = await createBooking(formattedBooking, token);

        if (response.error) {
            show(response.error, "error");
            return;
        }

        show("Booking confirmed! 🎉", "success");
        reset();
        setIsBookingModalOpen(false);
    };

    return (
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Fieldset>
                            <Field className="m-2">
                                <Label className="block">Datum</Label>
                                <Input
                                    className="default-bg mt-2 block w-full"
                                    type="date"
                                    {...register("date")}
                                />
                                {errors.date && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.date.message}
                                    </p>
                                )}
                            </Field>
                            <div className="flex">
                                <Field className="m-1 w-1/2">
                                    <Label className="block">Från</Label>
                                    <Input
                                        className="default-bg mt-2 block"
                                        type="time"
                                        {...register("from")}
                                    />
                                    {errors.from && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.from.message}
                                        </p>
                                    )}
                                </Field>
                                <Field className="m-2 w-1/2">
                                    <Label className="block">Till</Label>
                                    <Input
                                        className="default-bg mt-2 block"
                                        type="time"
                                        {...register("to")}
                                    />
                                    {errors.to && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.to.message}
                                        </p>
                                    )}
                                </Field>
                            </div>
                            <Field className="m-2">
                                <Label className="block">Description</Label>
                                <Input
                                    className="default-bg mt-2 block w-full"
                                    type="text"
                                    {...register("description")}
                                />
                            </Field>
                        </Fieldset>
                        <Button
                            type="submit"
                            className="default-bg mt-4 w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Booking..." : "Confirm Booking"}
                        </Button>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
