import HyperBarberLogo from "@/src/components/branding/hyperbarber-logo"
import { hyperBrand } from "@/src/config/brand"

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="section-shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <HyperBarberLogo />
        <p className="max-w-xl text-sm text-slate-400">
          © 2026 {hyperBrand.ecosystemName}. {hyperBrand.productName} é a base
          white-label para barbearias premium operarem com precisão.
        </p>
      </div>
    </footer>
  )
}

export default Footer
