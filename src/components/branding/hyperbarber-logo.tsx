import Link from "next/link"
import { SparklesIcon } from "lucide-react"
import { hyperBrand } from "@/src/config/brand"
import { cn } from "@/app/_lib/utils"

interface HyperBarberLogoProps {
  className?: string
  showEcosystem?: boolean
}

const HyperBarberLogo = ({
  className,
  showEcosystem = true,
}: HyperBarberLogoProps) => {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.18)]">
        <SparklesIcon size={18} />
      </div>
      <div className="leading-none">
        <p className="text-sm font-semibold text-white">
          {hyperBrand.productName}
        </p>
        {showEcosystem && (
          <p className="mt-1 text-[10px] uppercase text-cyan-100/55">
            {hyperBrand.ecosystemName}
          </p>
        )}
      </div>
    </Link>
  )
}

export default HyperBarberLogo
