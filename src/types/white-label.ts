import { ThemeMode, TenantStatus, UserRole } from "@prisma/client"

export interface TenantBranding {
  tenantId: string
  productName: string
  logoUrl?: string | null
  markUrl?: string | null
  primaryColor: string
  accentColor: string
  themeMode: ThemeMode
  customCss?: string | null
}

export interface WhiteLabelTenant {
  id: string
  name: string
  slug: string
  status: TenantStatus
  customDomain?: string | null
  logoUrl?: string | null
  primaryColor: string
  branding?: TenantBranding | null
}

export interface TenantAccess {
  tenantId: string
  userId: string
  role: UserRole
}
