import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import BookingItem from "../_components/booking-item"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getConcludedBookings } from "../_data/get-concluded-bookings"

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return notFound()
  }

  const [confirmedBookings, concludedBookings] = await Promise.all([
    getConfirmedBookings(),
    getConcludedBookings(),
  ])

  return (
    <>
      <Header />
      <main className="section-shell py-8">
        <div className="max-w-3xl">
          <p className="eyebrow">Agenda do cliente</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Suas reservas
          </h1>
          <p className="mt-3 text-slate-300">
            Acompanhe experiências confirmadas, histórico e detalhes de contato
            das unidades.
          </p>
        </div>

        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <div className="mt-8 rounded-[8px] border border-white/10 bg-white/[0.035] p-6 text-sm text-slate-300">
            Você ainda não tem reservas no HyperBarber.
          </div>
        )}

        {confirmedBookings.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-xs font-bold uppercase text-slate-400">
              Confirmadas
            </h2>
            <div className="grid gap-3 lg:grid-cols-2">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </section>
        )}

        {concludedBookings.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-xs font-bold uppercase text-slate-400">
              Finalizadas
            </h2>
            <div className="grid gap-3 lg:grid-cols-2">
              {concludedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export default Bookings
