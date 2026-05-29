"use client"

import { CopyIcon, SmartphoneIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "./ui/button"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phoneNumber: string) => {
    navigator.clipboard.writeText(phoneNumber)
    toast.success("Telefone copiado para a área de transferência.")
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-[8px] border border-white/10 bg-white/[0.03] p-3">
      <div className="flex min-w-0 items-center gap-2">
        <SmartphoneIcon className="shrink-0 text-cyan-100" size={18} />
        <p className="truncate text-sm text-slate-200">{phone}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => handleCopyPhoneClick(phone)}
      >
        <CopyIcon size={14} />
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
