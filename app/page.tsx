import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  BarChart3Icon,
  BotIcon,
  Building2Icon,
  CalendarDaysIcon,
  Layers3Icon,
  PaletteIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"
import { hyperBrand } from "@/src/config/brand"
import HyperAssistantPanel from "@/src/components/marketing/hyper-assistant-panel"
import { DEFAULT_TENANT_SLUG } from "@/src/modules/tenants/current"
import { formatCurrency } from "@/src/lib/format"

const platformFeatures = [
  {
    icon: CalendarDaysIcon,
    title: "Agenda de precisão",
    description:
      "Reservas, disponibilidade e histórico em uma jornada fluida para equipe e cliente.",
  },
  {
    icon: Building2Icon,
    title: "Operação multiunidade",
    description:
      "Estrutura preparada para studios, equipes, serviços e crescimento white-label.",
  },
  {
    icon: BotIcon,
    title: "Hyper Assistant",
    description:
      "Espaço de IA para detectar horários vagos, demanda recorrente e oportunidades comerciais.",
  },
  {
    icon: PaletteIcon,
    title: "Marca do cliente",
    description:
      "Logo, cor primária, slug, domínio e tema prontos para evoluir por tenant.",
  },
]

const Home = async () => {
  const tenant = await db.tenant.findUnique({
    where: {
      slug: DEFAULT_TENANT_SLUG,
    },
    select: {
      id: true,
      name: true,
    },
  })

  const tenantWhere = tenant?.id ? { tenantId: tenant.id } : {}
  const [barbershops, popularBarbershops, confirmedBookings, serviceCount] =
    await Promise.all([
      db.barbershop.findMany({
        where: tenantWhere,
        orderBy: {
          createdAt: "desc",
        },
        take: 8,
      }),
      db.barbershop.findMany({
        where: tenantWhere,
        orderBy: {
          name: "asc",
        },
        take: 8,
      }),
      getConfirmedBookings(),
      db.barbershopService.count({
        where: {
          ...tenantWhere,
          isActive: true,
        },
      }),
    ])

  const estimatedTicket =
    serviceCount > 0
      ? await db.barbershopService
          .findMany({
            where: {
              ...tenantWhere,
              isActive: true,
            },
            select: {
              price: true,
            },
          })
          .then((services) => {
            const total = services.reduce(
              (sum, service) => sum + Number(service.price),
              0,
            )
            return total / services.length
          })
      : 0

  return (
    <div>
      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),transparent_35%,rgba(124,58,237,0.12)_70%,transparent)]" />
          <div className="section-shell relative py-16 sm:py-20 lg:py-24">
            <div className="max-w-4xl">
              <p className="eyebrow">Hyper Galaxy apresenta</p>
              <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
                {hyperBrand.productName}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                {hyperBrand.productName} é o sistema operacional inteligente
                para barbearias premium. Agenda, clientes, equipe, automações e
                dados em uma experiência white-label criada para marcas que
                querem parecer maiores, vender melhor e operar com precisão.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/dashboard">
                    Abrir cockpit
                    <ArrowRightIcon size={18} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <Link href="/barbershops">
                    Explorar studios
                    <SparklesIcon size={18} />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="glass-panel rounded-[8px] p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="eyebrow">Cockpit operacional</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Dados, agenda e marca no mesmo plano de voo.
                    </h2>
                  </div>
                  <BadgeCheckIcon className="text-cyan-100" size={26} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[8px] border border-white/10 bg-black/25 p-4">
                    <p className="text-xs text-slate-400">Studios ativos</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {barbershops.length}
                    </p>
                  </div>
                  <div className="rounded-[8px] border border-white/10 bg-black/25 p-4">
                    <p className="text-xs text-slate-400">Serviços premium</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {serviceCount}
                    </p>
                  </div>
                  <div className="rounded-[8px] border border-white/10 bg-black/25 p-4">
                    <p className="text-xs text-slate-400">Ticket médio demo</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {formatCurrency(estimatedTicket)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-[8px] border border-cyan-300/15 bg-cyan-300/[0.04] p-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                    <ZapIcon size={18} className="text-cyan-100" />
                    Hoje é{" "}
                    <span className="font-medium text-white">
                      {format(new Date(), "EEEE, dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </span>
                    . A operação está pronta para agenda, dados e automações.
                  </div>
                </div>
              </div>

              <HyperAssistantPanel />
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-12">
          <div className="section-shell">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {platformFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[8px] bg-cyan-300/10 text-cyan-100">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-12">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="eyebrow">White-label por arquitetura</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Cada barbearia com sua marca, seu domínio e sua experiência.
              </h2>
              <p className="mt-4 leading-7 text-slate-300">
                A base agora prepara tenants, branding, logo, cor primária, slug
                e domínio customizado para transformar o HyperBarber em uma
                plataforma SaaS real do ecossistema Hyper Galaxy.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "TenantId em dados críticos",
                "BrandingConfig por cliente",
                "Plano e assinatura preparados",
                "Super Admin Hyper Galaxy",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-black/20 p-4 text-sm text-slate-200"
                >
                  <ShieldCheckIcon size={18} className="text-cyan-100" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="section-shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Marketplace premium</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Studios prontos para reserva
                </h2>
                <p className="mt-3 max-w-2xl text-slate-300">
                  A vitrine do cliente continua funcional, mas agora aparece
                  como uma experiência de marca moderna e tecnológica.
                </p>
              </div>
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/dashboard">
                  Ver dados da operação
                  <BarChart3Icon size={18} />
                </Link>
              </Button>
            </div>

            <div className="mt-6">
              <Search />
            </div>

            <div className="mt-6 flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
              {quickSearchOptions.map((option) => (
                <Button
                  className="shrink-0 gap-2"
                  variant="secondary"
                  key={option.title}
                  asChild
                >
                  <Link href={`/barbershops?service=${option.title}`}>
                    <Layers3Icon size={16} />
                    {option.title}
                  </Link>
                </Button>
              ))}
            </div>

            {confirmedBookings.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-3 text-xs font-bold uppercase text-slate-400">
                  Próximas reservas
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
                  {confirmedBookings.map((booking) => (
                    <BookingItem
                      key={booking.id}
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10">
              <h2 className="mb-3 text-xs font-bold uppercase text-slate-400">
                Recomendados
              </h2>
              <div className="flex gap-4 overflow-auto pb-1 [&::-webkit-scrollbar]:hidden">
                {barbershops.map((barbershop) => (
                  <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="mb-3 text-xs font-bold uppercase text-slate-400">
                Populares
              </h2>
              <div className="flex gap-4 overflow-auto pb-1 [&::-webkit-scrollbar]:hidden">
                {popularBarbershops.map((barbershop) => (
                  <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
