import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Factory, Bolt, TrendingUp, Warehouse, DraftingCompass } from "lucide-react"
import Image from "next/image"

const services = [
  {
    icon: Factory,
    title: "İmalat",
    description:
      "Şantiyede yerine monte edilecek elemanların atölyemizde projelere uygun şekilde titizlikle imal edilmesi.",
    image: "/cardImages/imalat.jpg",
  },
  {
    icon: Bolt,
    title: "Montaj",
    description: "İSG kurallarına ve projesine uygun şekilde çelik elemanların şantiyede yerine monte edilmesi.",
    image: "/cardImages/montaj.jpg",
  },
  {
    icon: TrendingUp,
    title: "Mevcut Yapıların Performans Analizi",
    description:
      "Olası depremde mevcut çelik yapılarınızın göstereceği dayanım performansının ölçümü ve gerekli güçlendirmelerinin nasıl yapılacağı ile ilgili danışmanlık hizmeti tarafınıza sunulmaktadır.",
    image: "/cardImages/performans-analizi.jpg",
  },
  {
    icon: Warehouse,
    title: "Yeni Yapılacak Yapıların Analizi",
    description:
      "Güncel Deprem ve Çelik Yapılar yönetmeliklerine uygun yapıların tarafımızca dayanım analizlerinin yapılması",
    image: "/cardImages/yapi-analizi.jpg",
  },
  {
    icon: DraftingCompass,
    title: "Analizleri Yapılmış Projelerin İmalat Projelerinin Hazırlanması",
    description:
      "Analizleri yapılmış olan projelerinizin atölyelerde imal edilebilcek şekilde imalat resimlerinin, Montaj paftalarının, CNC lazer kesim resimlerinin(2D, 3D) hazırlanması gibi alanlarda hizmet sunmaktayız.",
    image: "/cardImages/imalat-projeleri.jpg",
  },
]

export function Services() {
  return (
    <section id="hizmetler" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Hizmetlerimiz</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">Hizmetlerimiz</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 p-3 bg-primary text-primary-foreground rounded-lg">
                  <service.icon className="h-6 w-6" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
