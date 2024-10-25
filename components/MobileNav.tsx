"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { mobileSidebarLinks } from "@/utils/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"


const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image src="/iconos/hamburger.svg" width={30} height={30} alt="menu" className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none w-full bg-white-1">
          <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 pl-4">
            <Image src="/dazzle-line-rocket.png" alt="logo" width={23} height={27} />
            <h1 className="text-24 font-lexend text-black font-semibold ml-2">App Emprendedores</h1>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            {/* //los elmentos que va dentro de la ventana que se abra y se cierra */}
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-4 text-black font-manrope font-[300]">
              {mobileSidebarLinks.map(({ route, label, imgURL }) => {
                const isActive = pathname === route || pathname.startsWith(`${route}/`);

                return <SheetClose asChild key={route}>
                  <Link href={route} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start", {
                  'bg-nav-focus border-r-4 border-orange-1': isActive
                })}>
                  <Image src={imgURL} alt={label} width={24} height={24} />
                  <p className="font-lexend font-normal">{label}</p>
                </Link></SheetClose>
              })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav