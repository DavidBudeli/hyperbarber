import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import Footer from "./_components/footer"
import AuthProvider from "./_providers/auth"
import { hyperBrand } from "@/src/config/brand"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: `${hyperBrand.productName} | ${hyperBrand.tagline}`,
    template: `%s | ${hyperBrand.productName}`,
  },
  description: hyperBrand.shortDescription,
  applicationName: hyperBrand.productName,
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} min-h-full`}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col overflow-x-hidden">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </AuthProvider>
        <Toaster richColors theme="dark" />
      </body>
    </html>
  )
}
