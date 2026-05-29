"use client"

import Link from "next/link"
import Image from "next/image"
import { LogInIcon, LogOutIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Avatar, AvatarImage } from "./ui/avatar"
import { quickSearchOptions } from "../_constants/search"
import SignInDialog from "./sign-in-dialog"
import HyperBarberLogo from "@/src/components/branding/hyperbarber-logo"
import { mainNavigation } from "@/src/config/navigation"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  return (
    <SheetContent className="overflow-y-auto border-white/10 bg-[#070A12]/95">
      <SheetHeader>
        <SheetTitle className="text-left">
          <HyperBarberLogo showEcosystem={false} />
        </SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-white/10 py-5">
        {data?.user ? (
          <div className="flex min-w-0 items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>

            <div className="min-w-0">
              <p className="truncate font-bold">{data.user.name}</p>
              <p className="truncate text-xs text-slate-400">
                {data.user.email}
              </p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Acesse sua operação</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-white/10 py-5">
        {mainNavigation.map((item) => {
          const Icon = item.icon
          return (
            <SheetClose key={item.href} asChild>
              <Button className="justify-start gap-2" variant="ghost" asChild>
                <Link href={item.href}>
                  <Icon size={18} />
                  {item.label}
                </Link>
              </Button>
            </SheetClose>
          )
        })}
      </div>

      <div className="flex flex-col gap-2 border-b border-white/10 py-5">
        <p className="eyebrow px-3">Serviços rápidos</p>
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.title} asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  height={18}
                  width={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {data?.user && (
        <div className="flex flex-col gap-2 py-5">
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={18} />
            Encerrar sessão
          </Button>
        </div>
      )}
    </SheetContent>
  )
}

export default SidebarSheet
