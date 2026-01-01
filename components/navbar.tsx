"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/ygo_logo.svg"
            alt="YGO Logo"
            width={40}
            height={50}
            className="h-10 w-auto brightness-0 invert [filter:brightness(0)_saturate(100%)_invert(49%)_sepia(98%)_saturate(2476%)_hue-rotate(346deg)_brightness(95%)_contrast(93%)]"
          />
            <span className="text-3xl font-bold text-gray-700">YGO</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#hizmetler"
            className="text-sm font-medium hover:text-primary transition-colors"
            onClick={(e) => handleSmoothScroll(e, "#hizmetler")}
          >
            Hizmetler
          </Link>
          <Link
            href="/#projeler"
            className="text-sm font-medium hover:text-primary transition-colors"
            onClick={(e) => handleSmoothScroll(e, "#projeler")}
          >
            Projeler
          </Link>
          <Link
            href="/#iletisim"
            className="text-sm font-medium hover:text-primary transition-colors"
            onClick={(e) => handleSmoothScroll(e, "#iletisim")}
          >
            İletişim
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium hover:text-primary transition-colors px-0">
                Araçlar
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/civata-hesaplama">Cıvata Hesaplama</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link
              href="#hizmetler"
              className="text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={(e) => handleSmoothScroll(e, "#hizmetler")}
            >
              Hizmetler
            </Link>
            <Link
              href="#projeler"
              className="text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={(e) => handleSmoothScroll(e, "#projeler")}
            >
              Projeler
            </Link>
            <Link
              href="#iletisim"
              className="text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={(e) => handleSmoothScroll(e, "#iletisim")}
            >
              İletişim
            </Link>
            <div className="border-t border-border pt-4 mt-2">
                <p className="text-sm font-semibold text-muted-foreground px-2 mb-2">Araçlar</p>
                 <Link
                    href="/civata-hesaplama"
                    className="block text-sm font-medium hover:text-primary transition-colors py-2 px-2 rounded-md hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                    >
                    Cıvata Hesaplama
                </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
