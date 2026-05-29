import { endOfDay, startOfDay } from "date-fns"
import { BookingStatus } from "@prisma/client"
import { db } from "@/app/_lib/prisma"
import { DEFAULT_TENANT_SLUG } from "@/src/modules/tenants/current"

export const getDashboardData = async () => {
  const tenant = await db.tenant.findUnique({
    where: {
      slug: DEFAULT_TENANT_SLUG,
    },
    select: {
      id: true,
      name: true,
      status: true,
    },
  })

  const tenantFilter = tenant?.id ? { tenantId: tenant.id } : {}
  const todayStart = startOfDay(new Date())
  const todayEnd = endOfDay(new Date())

  const [todayBookings, upcomingBookings, allBookings, customers, services] =
    await Promise.all([
      db.booking.findMany({
        where: {
          ...tenantFilter,
          status: {
            not: BookingStatus.CANCELED,
          },
          date: {
            gte: todayStart,
            lte: todayEnd,
          },
        },
        include: {
          customer: true,
          service: {
            include: {
              barbershop: true,
            },
          },
          user: true,
        },
        orderBy: {
          date: "asc",
        },
      }),
      db.booking.findMany({
        where: {
          ...tenantFilter,
          status: {
            not: BookingStatus.CANCELED,
          },
          date: {
            gte: new Date(),
          },
        },
        include: {
          customer: true,
          service: {
            include: {
              barbershop: true,
            },
          },
          user: true,
        },
        orderBy: {
          date: "asc",
        },
        take: 6,
      }),
      db.booking.findMany({
        where: tenantFilter,
        include: {
          service: true,
        },
        take: 200,
      }),
      db.customer.findMany({
        where: tenantFilter,
        orderBy: {
          updatedAt: "desc",
        },
        take: 5,
      }),
      db.barbershopService.findMany({
        where: {
          ...tenantFilter,
          isActive: true,
        },
        include: {
          _count: {
            select: {
              bookings: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
        take: 8,
      }),
    ])

  const estimatedRevenue = upcomingBookings.reduce(
    (total, booking) => total + Number(booking.service.price),
    0,
  )

  const completedRevenue = allBookings
    .filter((booking) => booking.status === BookingStatus.COMPLETED)
    .reduce((total, booking) => total + Number(booking.service.price), 0)

  return {
    tenant,
    todayBookings,
    upcomingBookings,
    allBookings,
    customers,
    services,
    metrics: {
      bookingsToday: todayBookings.length,
      upcomingBookings: upcomingBookings.length,
      customers: customers.length,
      activeServices: services.length,
      estimatedRevenue,
      completedRevenue,
    },
  }
}
