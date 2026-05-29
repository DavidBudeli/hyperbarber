export const hyperBrand = {
  productName: "HyperBarber",
  ecosystemName: "Hyper Galaxy",
  tagline: "Sistema operacional inteligente para barbearias premium",
  shortDescription:
    "Agenda, clientes, equipe, automações e dados em uma experiência white-label criada para marcas que querem parecer maiores, vender melhor e operar com precisão.",
  url: "http://localhost:3007",
  supportEmail: "labs@hypergalaxy.com.br",
  colors: {
    space: "#05070D",
    ink: "#0A0D16",
    violet: "#7C3AED",
    blue: "#2563EB",
    cyan: "#22D3EE",
    ice: "#F8FAFC",
  },
} as const

export type HyperBrand = typeof hyperBrand
