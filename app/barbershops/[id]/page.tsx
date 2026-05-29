import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ChevronLeftIcon,
  MapPinIcon,
  MenuIcon,
  ShieldCheckIcon,
  StarIcon,
} from "lucide-react"
import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"

export const dynamic = "force-dynamic"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: {
        where: {
          isActive: true,
        },
        orderBy: {
          name: "asc",
        },
      },
      tenant: {
        include: {
          branding: true,
        },
      },
    },
  })

  if (!barbershop) {
    return notFound()
  }

  const rating = Number(barbershop.rating ?? 5)
    .toFixed(1)
    .replace(".", ",")

  return (
    <div>
      <div className="relative h-[320px] w-full overflow-hidden border-b border-white/10">
        <Image
          alt={barbershop.name}
          src={barbershop.imageUrl}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-black/20" />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/barbershops">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4 bg-black/40 backdrop-blur"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>

        <div className="section-shell absolute inset-x-0 bottom-0 pb-6">
          <p className="eyebrow">
            {barbershop.tenant?.branding?.productName ?? "HyperBarber"}
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">
            {barbershop.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-200">
            <span className="flex items-center gap-2">
              <MapPinIcon className="text-cyan-100" size={18} />
              {barbershop.address}
            </span>
            <span className="flex items-center gap-2">
              <StarIcon className="fill-cyan-100 text-cyan-100" size={18} />
              {rating} de avaliação
            </span>
          </div>
        </div>
      </div>

      <main className="section-shell grid gap-8 py-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="space-y-4">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
            <p className="eyebrow">Sobre a unidade</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {barbershop.description}
            </p>
          </div>

          <div className="rounded-[8px] border border-cyan-300/15 bg-cyan-300/[0.04] p-5">
            <div className="flex items-start gap-3">
              <ShieldCheckIcon
                size={20}
                className="mt-0.5 shrink-0 text-cyan-100"
              />
              <div>
                <h2 className="font-semibold text-white">
                  Operação verificada
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Unidade conectada ao ambiente HyperBarber com servicos, agenda
                  e dados preparados para white-label.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase text-slate-400">
              Contato
            </h2>
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </aside>

        <section>
          <div className="mb-5">
            <p className="eyebrow">Menu de experiências</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Servicos disponiveis
            </h2>
          </div>
          <div className="space-y-3">
            {barbershop.services.map((service) => (
              <ServiceItem
                key={service.id}
                barbershop={JSON.parse(JSON.stringify(barbershop))}
                service={JSON.parse(JSON.stringify(service))}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default BarbershopPage
