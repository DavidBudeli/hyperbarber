"use server"

import { endOfDay, startOfDay } from "date-fns"
import { BookingStatus } from "@prisma/client"
import { db } from "../_lib/prisma"

interface GetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = ({ date, serviceId }: GetBookingsProps) => {
  return db.booking.findMany({
    where: {
      serviceId,
      status: {
        not: BookingStatus.CANCELED,
      },
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}
