import {  Dialog, DialogPanel, DialogTitle, Field, Fieldset, Input, Label } from '@headlessui/react'
import Button from '../ui/Button'
import { useState } from 'react';
import type { Booking, BookingForm } from '@/types/booking';
import { createBooking } from '@/services/api';
import { useAtomValue } from 'jotai';
import { tokenAtom } from '@/lib/atoms';

//add popup for error/ success

interface BookingModalProps {
  isOpen: boolean,
  roomId: number,
  roomName: string,
  onCancel: () => void,
  showToast: (
    message: string,
    type?: "success" | "error",
  ) => void
}

const BookingModal:React.FC<BookingModalProps> = ({isOpen, onCancel, roomId, roomName, showToast}) => {
  const [booking, setBooking] = useState<BookingForm>({
    date: "",
    from: "",
    to: "",
    description: ""
  });

  const token = useAtomValue(tokenAtom);
  

  const handleBooking = async () => {
    // add field for description

    const startDateTime = new Date(`${booking.date}T${booking.from}`);
    const endDateTime = new Date(`${booking.date}T${booking.to}`);
    const formattedBooking: Booking = {
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      roomId,
      name: roomName,
      description: booking.description 
    };

    const response = await createBooking(formattedBooking, token)
      if (response.error) {
        showToast(response.error, "error");
        return;
      }

      showToast("Booking confirmed! 🎉", "success");      
      onCancel()
    }

  return (
    <>
      <Dialog open={isOpen} onClose={onCancel} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />  {/* backdrop */}
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="max-w-3xl w-[80%] space-y-4 border bg-white p-7 rounded-2xl">
            <DialogTitle className="font-bold my-0.5 text-xl">Boka rum {roomId}</DialogTitle>
            <Fieldset>
              <Field className="m-2">
                <Label className="block">Datum</Label>
                <Input className="mt-2 block w-full  default-bg" type='date' value={booking.date} onChange={(e) => setBooking({...booking, date:e.target.value})} />
              </Field>
              <div className='flex'>
                <Field className="w-1/2 m-1">
                  <Label className="block">Från</Label>
                  <Input className="mt-2 block default-bg" type='time' value={booking.from} onChange={(e) => setBooking({...booking, from:e.target.value})}/>
                </Field>
                <Field className="w-1/2 m-2">
                  <Label className="block">Till</Label>
                  <Input className="mt-2 block default-bg" type='time' value={booking.to} onChange={(e) => setBooking({...booking, to:e.target.value})} />
                </Field>
              </div>
              <Field className="m-2">
                <Label className="block">Description</Label>
                <Input className="mt-2 block w-full  default-bg" type='text' value={booking.description} onChange={(e) => setBooking({...booking, description:e.target.value})} />
              </Field>

            </Fieldset>
            <Button 
              className='w-full default-bg' 
              onClick={handleBooking}
              disabled={!booking.date || !booking.from || !booking.to}
            >Confirm Booking</Button>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}


export default BookingModal