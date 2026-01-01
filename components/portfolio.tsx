"use client"

import type React from "react"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    title: "Endüstriyel Çelik Konstrüksiyon İmalatı",
    category: "Çelik İmalat",
    description: "15.000 m² kapalı alan fabrika çelik konstrüksiyon imalatı ve montajı",
    images: [
      "/projects/steel-manufacturing/project1-1.jpg",
      "/projects/steel-manufacturing/project1-2.jpg",
      "/projects/steel-manufacturing/project1-3.jpg",
    ],
    status: "completed" as const,
  },
  {
    title: "Köprü Montaj ve Çelik Yapı İşleri",
    category: "Montaj",
    description: "250 metre açıklıklı köprü çelik taşıyıcı sistemleri montajı",
    images: [
      "/projects/assembly/project2-1.jpg",
      "/projects/assembly/project2-2.jpg",
      "/projects/assembly/project2-3.jpg",
    ],
    status: "ongoing" as const,
  },
  {
    title: "Ticari Merkez Statik Projelendirme",
    category: "Projelendirme",
    description: "Çok katlı ticari merkez yapısal analiz ve statik proje çalışması",
    images: [
      "/projects/engineering/project3-1.jpg",
      "/projects/engineering/project3-2.jpg",
      "/projects/engineering/project3-3.jpg",
    ],
    status: "completed" as const,
  },
  {
    title: "Sismik Performans Analizi",
    category: "Analiz",
    description: "Mevcut yapı deprem performans değerlendirmesi ve güçlendirme çalışması",
    images: [
      "/projects/analysis/project4-1.jpg",
      "/projects/analysis/project4-2.jpg",
      "/projects/analysis/project4-3.jpg",
    ],
    status: "completed" as const,
  },
  {
    title: "Çelik Hangar İmalat Projesi",
    category: "Çelik İmalat",
    description: "Havaalanı hangar çelik konstrüksiyon imalatı - 8.000 m²",
    images: [
      "/projects/steel-manufacturing/project5-1.jpg",
      "/projects/steel-manufacturing/project5-2.jpg",
      "/projects/steel-manufacturing/project5-3.jpg",
    ],
    status: "ongoing" as const,
  },
  {
    title: "Rezidans Kompleksi Yapı Mühendisliği",
    category: "Projelendirme",
    description: "3 blok rezidans yapısal tasarım ve projelendirme hizmetleri",
    images: [
      "/projects/engineering/project6-1.jpg",
      "/projects/engineering/project6-2.jpg",
      "/projects/engineering/project6-3.jpg",
    ],
    status: "upcoming" as const,
  },
]

type ProjectStatus = "all" | "ongoing" | "completed" | "upcoming"

const filterButtons = [
  { value: "all" as ProjectStatus, label: "Tümü" },
  { value: "ongoing" as ProjectStatus, label: "Devam Eden" },
  { value: "completed" as ProjectStatus, label: "Bitmiş" },
  { value: "upcoming" as ProjectStatus, label: "Başlayacak" },
]

export function Portfolio() {
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus>("all")
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})
  const [showLogo, setShowLogo] = useState<{ [key: number]: boolean }>({})
  const [touchStart, setTouchStart] = useState<{ [key: number]: number }>({})
  const [touchEnd, setTouchEnd] = useState<{ [key: number]: number }>({})

  const filteredProjects = projects.filter((project) => selectedStatus === "all" || project.status === selectedStatus)

  const handleImageChange = (projectIndex: number, imageIndex: number) => {
    setShowLogo((prev) => ({ ...prev, [projectIndex]: true }))

    setTimeout(() => {
      setCurrentImageIndex((prev) => ({
        ...prev,
        [projectIndex]: imageIndex,
      }))
    }, 150)

    setTimeout(() => {
      setShowLogo((prev) => ({ ...prev, [projectIndex]: false }))
    }, 500)
  }

  const handleNextImage = (projectIndex: number, totalImages: number) => {
    const currentIndex = currentImageIndex[projectIndex] || 0
    const nextIndex = (currentIndex + 1) % totalImages
    handleImageChange(projectIndex, nextIndex)
  }

  const handlePrevImage = (projectIndex: number, totalImages: number) => {
    const currentIndex = currentImageIndex[projectIndex] || 0
    const prevIndex = (currentIndex - 1 + totalImages) % totalImages
    handleImageChange(projectIndex, prevIndex)
  }

  const onTouchStart = (projectIndex: number, e: React.TouchEvent) => {
    setTouchEnd({ ...touchEnd, [projectIndex]: 0 })
    setTouchStart({ ...touchStart, [projectIndex]: e.targetTouches[0].clientX })
  }

  const onTouchMove = (projectIndex: number, e: React.TouchEvent) => {
    setTouchEnd({ ...touchEnd, [projectIndex]: e.targetTouches[0].clientX })
  }

  const onTouchEnd = (projectIndex: number, totalImages: number) => {
    const start = touchStart[projectIndex] || 0
    const end = touchEnd[projectIndex] || 0
    if (!start || !end) return

    const distance = start - end
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNextImage(projectIndex, totalImages)
    }
    if (isRightSwipe) {
      handlePrevImage(projectIndex, totalImages)
    }
  }

  return (
    <section id="projeler" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Projelerimiz</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Çelik imalat, montaj, projelendirme ve analiz alanlarında gerçekleştirdiğimiz projeler
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-border bg-card p-1 shadow-sm flex-wrap gap-1 justify-center">
            {filterButtons.map((button) => (
              <button
                key={button.value}
                onClick={() => setSelectedStatus(button.value)}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                  selectedStatus === button.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => {
            const currentIndex = currentImageIndex[index] || 0
            const isLogoVisible = showLogo[index] || false
            return (
              <Card key={index} className="overflow-hidden border-border hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  <div
                    className="relative aspect-[3/2] overflow-hidden"
                    onTouchStart={(e) => onTouchStart(index, e)}
                    onTouchMove={(e) => onTouchMove(index, e)}
                    onTouchEnd={() => onTouchEnd(index, project.images.length)}
                  >
                    <Image
                      src={project.images[currentIndex] || "/placeholder.svg"}
                      alt={`${project.title} - Görsel ${currentIndex + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div
                      className={`absolute inset-0 bg-background/90 flex items-center justify-center transition-opacity duration-500 pointer-events-none z-20 ${
                        isLogoVisible ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src="/ygo_logo.svg"
                        alt="YGO Logo"
                        width={120}
                        height={120}
                        className="animate-pulse [filter:brightness(0)_saturate(100%)_invert(27%)_sepia(98%)_saturate(2466%)_hue-rotate(346deg)_brightness(94%)_contrast(97%)]"
                      />
                    </div>

                    <button
                      onClick={() => handlePrevImage(index, project.images.length)}
                      className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10 items-center justify-center"
                      aria-label="Önceki görsel"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={() => handleNextImage(index, project.images.length)}
                      className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10 items-center justify-center"
                      aria-label="Sonraki görsel"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {project.images.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={() => handleImageChange(index, imgIndex)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentIndex === imgIndex ? "bg-primary w-8" : "bg-white/60 hover:bg-white/80"
                          }`}
                          aria-label={`Görsel ${imgIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-primary font-semibold mb-2">{project.category}</p>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
