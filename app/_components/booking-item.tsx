"use client"

import Image from "next/image"
import { useState } from "react"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Prisma } from "@prisma/client"
import { DialogClose } from "@radix-ui/react-dialog"
import { CalendarClockIcon, MapPinIcon } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { deleteBooking } from "../_actions/delete-booking"
import BookingSummary from "./booking-summary"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva cancelada com sucesso.")
    } catch (error) {
      console.error(error)
      toast.error("Não foi possível cancelar esta reserva.")
    }
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="w-full min-w-[90%] sm:min-w-[360px]">
        <Card className="border-white/10 bg-white/[0.035]">
          <CardContent className="flex justify-between p-0">
            <div className="flex min-w-0 flex-col gap-2 py-5 pl-5 pr-3 text-left">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="truncate font-semibold text-white">
                {booking.service.name}
              </h3>

              <div className="flex min-w-0 items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="truncate text-sm text-slate-300">
                  {booking.service.barbershop.name}
                </p>
              </div>
            </div>

            <div className="flex min-w-[92px] flex-col items-center justify-center border-l border-white/10 px-5">
              <p className="text-sm capitalize text-slate-400">
                {format(booking.date, "MMM", { locale: ptBR })}
              </p>
              <p className="text-2xl font-semibold text-white">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm text-cyan-100">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[88%] border-white/10 bg-[#070A12]">
        <SheetHeader>
          <SheetTitle className="text-left">Detalhes da reserva</SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end overflow-hidden rounded-[8px]">
          <Image
            alt={`Mapa da unidade ${booking.service.barbershop.name}`}
            src="/map.png"
            fill
            className="object-cover"
          />

          <Card className="z-10 mx-3 mb-3 w-full border-white/10 bg-black/60 backdrop-blur">
            <CardContent className="flex items-center gap-3 px-4 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div className="min-w-0">
                <h3 className="truncate font-bold text-white">
                  {barbershop.name}
                </h3>
                <p className="truncate text-xs text-slate-300">
                  {barbershop.address}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit gap-2"
            variant={isConfirmed ? "default" : "secondary"}
          >
            <CalendarClockIcon size={14} />
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <div className="mb-3 mt-6">
            <BookingSummary
              barbershop={barbershop}
              service={booking.service}
              selectedDate={booking.date}
            />
          </div>

          <div className="mb-3 flex items-start gap-2 rounded-[8px] border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300">
            <MapPinIcon size={16} className="mt-0.5 shrink-0 text-cyan-100" />
            {barbershop.address}
          </div>

          <div className="space-y-3">
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>

        <SheetFooter className="mt-6">
          <div className="flex w-full items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button variant="destructive" className="w-full">
                    Cancelar
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>Cancelar reserva?</DialogTitle>
                    <DialogDescription>
                      Esta ação remove o horário da sua agenda e libera a vaga
                      para outro cliente.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant="secondary" className="w-full">
                        Voltar
                      </Button>
                    </DialogClose>
                    <DialogClose className="w-full">
                      <Button
                        variant="destructive"
                        onClick={handleCancelBooking}
                        className="w-full"
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
