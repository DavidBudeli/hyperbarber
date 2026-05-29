"use server"

import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { BookingStatus } from "@prisma/client"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"

interface CreateBookingParams {
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error("Usuário não autenticado")
  }

  const service = await db.barbershopService.findUnique({
    where: {
      id: params.serviceId,
    },
    select: {
      id: true,
      tenantId: true,
      barbershopId: true,
    },
  })

  if (!service) {
    throw new Error("Serviço não encontrado")
  }

  const customer =
    service.tenantId && session.user.email && session.user.name
      ? await db.customer.upsert({
          where: {
            tenantId_email: {
              tenantId: service.tenantId,
              email: session.user.email,
            },
          },
          update: {
            name: session.user.name,
            userId: session.user.id,
            barbershopId: service.barbershopId,
          },
          create: {
            tenantId: service.tenantId,
            userId: session.user.id,
            barbershopId: service.barbershopId,
            name: session.user.name,
            email: session.user.email,
          },
        })
      : null

  await db.booking.create({
    data: {
      serviceId: service.id,
      date: params.date,
      userId: session.user.id,
      tenantId: service.tenantId,
      customerId: customer?.id,
      status: BookingStatus.CONFIRMED,
    },
  })

  revalidatePath("/barbershops/[id]")
  revalidatePath("/bookings")
  revalidatePath("/dashboard")
}
