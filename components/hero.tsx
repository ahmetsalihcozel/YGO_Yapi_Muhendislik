import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image src="/hero-welder.jpg" alt="Çelik imalat kaynakçısı" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">Yapısal Çelikte Çözüm Ortağınız</h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Çeliğin yapıya dönüştüğü her alanda yönetmeliklere uygun projelendirme, imalat ve montaj süreçlerinde
          yanınızdayız.
        </p>
        <Button size="lg" variant="secondary" className="gap-2">
          Hizmetlerimizi Keşfedin
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
