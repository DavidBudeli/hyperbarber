"use server"

import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"

export const deleteBooking = async (bookingId: string) => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error("Usuário não autenticado")
  }

  const deleted = await db.booking.deleteMany({
    where: {
      id: bookingId,
      userId: session.user.id,
    },
  })

  if (deleted.count === 0) {
    throw new Error("Reserva não encontrada para este usuário")
  }

  revalidatePath("/bookings")
  revalidatePath("/dashboard")
}
