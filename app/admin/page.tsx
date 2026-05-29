import { getServerSession } from "next-auth"
import { UserRole } from "@prisma/client"
import {
  Building2Icon,
  Globe2Icon,
  Layers3Icon,
  ShieldIcon,
  UsersRoundIcon,
} from "lucide-react"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"

const AdminPage = async () => {
  const session = await getServerSession(authOptions)
  const canViewMasterData = session?.user?.role === UserRole.SUPER_ADMIN

  const tenants = canViewMasterData
    ? await db.tenant.findMany({
        include: {
          branding: true,
          subscriptions: {
            include: {
              plan: true,
            },
            take: 1,
          },
          _count: {
            select: {
              barbershops: true,
              bookings: true,
              users: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : []

  return (
    <div>
      <Header />
      <main className="section-shell py-8">
        <div className="max-w-3xl">
          <p className="eyebrow">Hyper Galaxy Master Layer</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Super Admin
          </h1>
          <p className="mt-3 text-slate-300">
            Base arquitetural para a Hyper Galaxy controlar empresas, planos,
            branding, domínios, usuários e volume de reservas.
          </p>
        </div>

        {!canViewMasterData && (
          <div className="mt-8 rounded-[8px] border border-cyan-300/15 bg-cyan-300/[0.04] p-6">
            <div className="flex items-start gap-3">
              <ShieldIcon className="mt-1 text-cyan-100" size={22} />
              <div>
                <h2 className="font-semibold text-white">
                  Acesso master preparado
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Esta área já está pronta para ser protegida por usuários com
                  role `SUPER_ADMIN`. A listagem real de tenants fica oculta
                  para contas comuns.
                </p>
              </div>
            </div>
          </div>
        )}

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Empresas",
              value: tenants.length,
              icon: Building2Icon,
            },
            {
              title: "Usuários",
              value: tenants.reduce(
                (sum, tenant) => sum + tenant._count.users,
                0,
              ),
              icon: UsersRoundIcon,
            },
            {
              title: "Reservas",
              value: tenants.reduce(
                (sum, tenant) => sum + tenant._count.bookings,
                0,
              ),
              icon: Layers3Icon,
            },
            {
              title: "Domínios",
              value: tenants.filter((tenant) => tenant.customDomain).length,
              icon: Globe2Icon,
            },
          ].map((metric) => {
            const Icon = metric.icon
            return (
              <div
                key={metric.title}
                className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">{metric.title}</p>
                    <p className="mt-2 text-3xl font-semibold text-white">
                      {metric.value}
                    </p>
                  </div>
                  <Icon className="text-cyan-100" size={22} />
                </div>
              </div>
            )
          })}
        </section>

        {canViewMasterData && (
          <section className="mt-8 rounded-[8px] border border-white/10 bg-white/[0.035]">
            <div className="grid border-b border-white/10 px-5 py-4 text-xs uppercase text-slate-400 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
              <span>Cliente</span>
              <span>Status</span>
              <span>Plano</span>
              <span>Reservas</span>
            </div>
            {tenants.map((tenant) => (
              <div
                key={tenant.id}
                className="grid gap-3 border-b border-white/10 px-5 py-4 text-sm last:border-b-0 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]"
              >
                <div>
                  <p className="font-medium text-white">{tenant.name}</p>
                  <p className="text-slate-400">
                    {tenant.customDomain ?? `${tenant.slug}.hyperbarber.app`}
                  </p>
                </div>
                <p className="text-cyan-100">{tenant.status}</p>
                <p className="text-slate-300">
                  {tenant.subscriptions[0]?.plan.name ?? "Sem plano"}
                </p>
                <p className="text-slate-300">{tenant._count.bookings}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

export default AdminPage
