import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Barbershop, BarbershopService } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import { formatCurrency } from "@/src/lib/format"

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">
  barbershop: Pick<Barbershop, "name">
  selectedDate: Date
}

const BookingSummary = ({
  service,
  barbershop,
  selectedDate,
}: BookingSummaryProps) => {
  return (
    <Card className="border-white/10 bg-white/[0.035]">
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-bold text-white">{service.name}</h2>
          <p className="text-sm font-bold text-cyan-100">
            {formatCurrency(Number(service.price))}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm text-slate-400">Data</h2>
          <p className="text-right text-sm text-slate-100">
            {format(selectedDate, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm text-slate-400">Horário</h2>
          <p className="text-sm text-slate-100">
            {format(selectedDate, "HH:mm")}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm text-slate-400">Studio</h2>
          <p className="text-right text-sm text-slate-100">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingSummary
