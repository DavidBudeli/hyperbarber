import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  BanknoteIcon,
  CalendarClockIcon,
  CalendarDaysIcon,
  CircleDollarSignIcon,
  Clock3Icon,
  ScissorsIcon,
  SparklesIcon,
  UsersRoundIcon,
} from "lucide-react"
import Header from "../_components/header"
import HyperAssistantPanel from "@/src/components/marketing/hyper-assistant-panel"
import { getDashboardData } from "@/src/modules/dashboard/dashboard-data"
import { formatCurrency } from "@/src/lib/format"

const DashboardPage = async () => {
  const data = await getDashboardData()

  const metricCards = [
    {
      title: "Reservas hoje",
      value: data.metrics.bookingsToday.toString(),
      detail: "Agenda operacional",
      icon: CalendarDaysIcon,
    },
    {
      title: "Próximos horários",
      value: data.metrics.upcomingBookings.toString(),
      detail: "Fila ativa",
      icon: Clock3Icon,
    },
    {
      title: "Clientes recentes",
      value: data.metrics.customers.toString(),
      detail: "Base identificada",
      icon: UsersRoundIcon,
    },
    {
      title: "Receita prevista",
      value: formatCurrency(data.metrics.estimatedRevenue),
      detail: "Reservas futuras",
      icon: CircleDollarSignIcon,
    },
  ]

  return (
    <div>
      <Header />
      <main className="section-shell py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Cockpit HyperBarber</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Dashboard da operação
            </h1>
            <p className="mt-3 max-w-3xl text-slate-300">
              Visão premium para agenda, clientes, serviços, receita estimada e
              oportunidades futuras de IA.
            </p>
          </div>
          <div className="rounded-[8px] border border-cyan-300/15 bg-cyan-300/[0.04] px-4 py-3 text-sm text-cyan-50">
            {data.tenant?.name ?? "Tenant demo"} ·{" "}
            {data.tenant?.status ?? "TRIALING"}
          </div>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">{card.title}</p>
                    <p className="mt-2 text-3xl font-semibold text-white">
                      {card.value}
                    </p>
                    <p className="mt-1 text-xs text-cyan-100/70">
                      {card.detail}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-cyan-300/10 text-cyan-100">
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Agenda do dia</p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  Horários em movimento
                </h2>
              </div>
              <CalendarClockIcon className="text-cyan-100" size={22} />
            </div>

            <div className="space-y-3">
              {data.todayBookings.length > 0 ? (
                data.todayBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="grid gap-3 rounded-[8px] border border-white/10 bg-black/20 p-4 sm:grid-cols-[80px_1fr_auto]"
                  >
                    <p className="font-semibold text-cyan-100">
                      {format(booking.date, "HH:mm", { locale: ptBR })}
                    </p>
                    <div>
                      <p className="font-medium text-white">
                        {booking.service.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        {booking.customer?.name ??
                          booking.user.name ??
                          "Cliente HyperBarber"}
                      </p>
                    </div>
                    <p className="text-sm text-slate-300">
                      {booking.service.barbershop.name}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-[8px] border border-white/10 bg-black/20 p-5 text-sm text-slate-300">
                  Nenhuma reserva para hoje. O Hyper Assistant pode sugerir uma
                  campanha para ocupar horários vagos.
                </div>
              )}
            </div>
          </div>

          <HyperAssistantPanel />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-4 flex items-center gap-2">
              <ScissorsIcon className="text-cyan-100" size={18} />
              <h2 className="font-semibold text-white">
                Serviços mais agendados
              </h2>
            </div>
            <div className="space-y-3">
              {data.services.slice(0, 5).map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="truncate text-slate-300">
                    {service.name}
                  </span>
                  <span className="text-cyan-100">
                    {service._count.bookings}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-4 flex items-center gap-2">
              <UsersRoundIcon className="text-cyan-100" size={18} />
              <h2 className="font-semibold text-white">Clientes recentes</h2>
            </div>
            <div className="space-y-3">
              {data.customers.length > 0 ? (
                data.customers.map((customer) => (
                  <div key={customer.id} className="text-sm">
                    <p className="font-medium text-white">{customer.name}</p>
                    <p className="text-slate-400">
                      {customer.email ?? customer.phone ?? "Contato pendente"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  Clientes serão vinculados automaticamente a novas reservas.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-4 flex items-center gap-2">
              <BanknoteIcon className="text-cyan-100" size={18} />
              <h2 className="font-semibold text-white">Faturamento estimado</h2>
            </div>
            <p className="text-3xl font-semibold text-white">
              {formatCurrency(data.metrics.estimatedRevenue)}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Valor calculado a partir das reservas futuras confirmadas. A base
              já está pronta para integrar pagamentos e planos.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-cyan-100">
              <SparklesIcon size={16} />
              Insights de IA em expansão
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage
