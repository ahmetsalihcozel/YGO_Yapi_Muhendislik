"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const partners = [
  { name: "TechSteel A.Ş.", logo: "/partners/partner1.jpg" },
  { name: "MetalWorks Inc.", logo: "/partners/partner2.jpg" },
  { name: "Industrial Solutions", logo: "/partners/partner3.jpg" },
  { name: "BuildCorp", logo: "/partners/partner4.jpg" },
  { name: "SteelTech Pro", logo: "/partners/partner5.jpg" },
  { name: "Engineering Plus", logo: "/partners/partner6.jpg" },
  { name: "Construct Group", logo: "/partners/partner7.jpg" },
  { name: "Modern Steel", logo: "/partners/partner8.jpg" },
]

export function Footer() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollPosition = 0
    const scrollStep = 200 // Her adımda kaydırılacak piksel miktarı
    const scrollInterval = 3000 // 3 saniyede bir kaydır

    const autoScroll = setInterval(() => {
      scrollPosition += scrollStep

      // Scroll pozisyonu içeriğin sonuna ulaştığında başa dön
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }

      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }, scrollInterval)

    return () => clearInterval(autoScroll)
  }, [])

  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">İş Ortaklarımız</h2>

        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-12 overflow-x-hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* İlk set logolar */}
            {partners.map((partner, index) => (
              <div
                key={`partner-1-${index}`}
                className="flex-shrink-0 w-48 h-24 bg-card rounded-lg border border-border flex items-center justify-center p-4 hover:border-primary/50 transition-colors overflow-hidden"
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={160}
                  height={80}
                  className="max-w-full object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`partner-2-${index}`}
                className="flex-shrink-0 w-48 h-24 bg-card rounded-lg border border-border flex items-center justify-center p-4 hover:border-primary/50 transition-colors overflow-hidden"
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={160}
                  height={80}
                  className="max-w-full object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center text-muted-foreground text-sm">
          <p>&copy; 2026 YGO. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
