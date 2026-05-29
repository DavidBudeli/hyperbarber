import { hyperBrand } from "@/src/config/brand"

export const defaultBrandingConfig = {
  productName: hyperBrand.productName,
  primaryColor: hyperBrand.colors.violet,
  accentColor: hyperBrand.colors.cyan,
  themeMode: "DARK",
  welcomeHeadline: "Controle cada cadeira como uma operação premium.",
} as const
