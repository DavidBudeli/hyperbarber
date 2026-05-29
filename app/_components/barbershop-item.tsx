import Image from "next/image"
import Link from "next/link"
import { Barbershop } from "@prisma/client"
import { ArrowUpRightIcon, MapPinIcon, StarIcon } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const rating = Number(barbershop.rating ?? 5)
    .toFixed(1)
    .replace(".", ",")

  return (
    <Card className="min-w-[190px] overflow-hidden border-white/10 bg-white/[0.035]">
      <CardContent className="p-0">
        <div className="relative h-[158px] w-full">
          <Image
            alt={barbershop.name}
            fill
            className="object-cover"
            src={barbershop.imageUrl}
          />

          <Badge className="absolute left-2 top-2 gap-1 border-white/10 bg-black/55 backdrop-blur">
            <StarIcon size={12} className="fill-cyan-100 text-cyan-100" />
            <span className="text-xs font-semibold">{rating}</span>
          </Badge>
        </div>

        <div className="space-y-3 p-3">
          <div>
            <h3 className="truncate font-semibold text-white">
              {barbershop.name}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-sm text-slate-400">
              <MapPinIcon size={14} className="shrink-0 text-cyan-100/70" />
              <p className="truncate">{barbershop.address}</p>
            </div>
          </div>

          <Button variant="secondary" className="w-full gap-2" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>
              Ver agenda
              <ArrowUpRightIcon size={16} />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
