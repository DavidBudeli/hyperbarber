import { Prisma } from "@prisma/client"
import BarbershopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"
import { DEFAULT_TENANT_SLUG } from "@/src/modules/tenants/current"

export const dynamic = "force-dynamic"

interface BarbershopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const tenant = await db.tenant.findUnique({
    where: {
      slug: DEFAULT_TENANT_SLUG,
    },
    select: {
      id: true,
    },
  })

  const filters: Prisma.BarbershopWhereInput[] = []

  if (searchParams?.title) {
    filters.push({
      name: {
        contains: searchParams.title,
        mode: "insensitive",
      },
    })
  }

  if (searchParams?.service) {
    filters.push({
      services: {
        some: {
          name: {
            contains: searchParams.service,
            mode: "insensitive",
          },
        },
      },
    })
  }

  const barbershops = await db.barbershop.findMany({
    where: {
      ...(tenant?.id ? { tenantId: tenant.id } : {}),
      ...(filters.length > 0 ? { OR: filters } : {}),
    },
    orderBy: {
      name: "asc",
    },
  })

  const resultLabel =
    searchParams?.title || searchParams?.service || "unidades da marca"

  return (
    <div>
      <Header />
      <main className="section-shell py-8">
        <div className="max-w-3xl">
          <p className="eyebrow">White-label HyperBarber</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Operacao demo da marca
          </h1>
          <p className="mt-3 text-slate-300">
            Valide a experiencia de uma marca HyperBarber com unidades,
            servicos, agenda e identidade conectadas ao mesmo tenant.
          </p>
        </div>

        <div className="my-6">
          <Search />
        </div>

        <h2 className="mb-4 mt-8 text-xs font-bold uppercase text-slate-400">
          Resultados para “{resultLabel}”
        </h2>

        {barbershops.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        ) : (
          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-6 text-sm text-slate-300">
            Nenhuma unidade encontrada para este filtro.
          </div>
        )}
      </main>
    </div>
  )
}

export default BarbershopsPage
