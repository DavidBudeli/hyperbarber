import {
  CalendarClockIcon,
  MegaphoneIcon,
  SparklesIcon,
  TrendingUpIcon,
  UserRoundCheckIcon,
} from "lucide-react"

export const hyperAssistantInsights = [
  {
    icon: CalendarClockIcon,
    title: "Ocupação inteligente",
    message:
      "Você tem 3 horários vagos hoje. Deseja criar uma campanha automática?",
  },
  {
    icon: TrendingUpIcon,
    title: "Demanda prevista",
    message: "Sexta-feira às 19h é seu horário de maior demanda.",
  },
  {
    icon: UserRoundCheckIcon,
    title: "Retenção",
    message: "Cliente sem retorno há 30 dias detectado.",
  },
  {
    icon: MegaphoneIcon,
    title: "Ação sugerida",
    message: "Envie um incentivo para clientes VIP antes do fim de semana.",
  },
] as const

export const hyperAssistantModule = {
  name: "Hyper Assistant",
  icon: SparklesIcon,
  description:
    "Camada de inteligência para detectar oportunidades, prever demanda e sugerir ações comerciais.",
} as const
