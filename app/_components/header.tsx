import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import HyperBarberLogo from "@/src/components/branding/hyperbarber-logo"
import { mainNavigation } from "@/src/config/navigation"

const Header = () => {
  return (
    <header className="bg-background/82 sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <HyperBarberLogo />

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNavigation.slice(0, 4).map((item) => {
            const Icon = item.icon
            return (
              <Button key={item.href} variant="ghost" size="sm" asChild>
                <Link href={item.href} className="gap-2 text-slate-300">
                  <Icon size={16} />
                  {item.label}
                </Link>
              </Button>
            )
          })}
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="lg:hidden">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>
    </header>
  )
}

export default Header
