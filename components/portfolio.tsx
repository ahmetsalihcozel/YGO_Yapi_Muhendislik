"use client"

import type React from "react"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Project } from "@/lib/projects"
import Link from "next/link"

interface PortfolioProps {
  projects: Project[];
  showViewAll?: boolean;
}

export function Portfolio({ projects, showViewAll = false }: PortfolioProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})
  const [showLogo, setShowLogo] = useState<{ [key: number]: boolean }>({})
  const [touchStart, setTouchStart] = useState<{ [key: number]: number }>({})
  const [touchEnd, setTouchEnd] = useState<{ [key: number]: number }>({})

  // Derive unique categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map(p => p.category)));
    return [
      { value: "all", label: "Tümü" },
      ...uniqueCategories.map(c => ({ value: c, label: c }))
    ];
  }, [projects]);

  const filteredProjects = projects.filter((project) => selectedStatus === "all" || project.category === selectedStatus)

  const handleImageChange = (projectId: number, imageIndex: number) => {
    setShowLogo((prev) => ({ ...prev, [projectId]: true }))

    setTimeout(() => {
      setCurrentImageIndex((prev) => ({
        ...prev,
        [projectId]: imageIndex,
      }))
    }, 150)

    setTimeout(() => {
      setShowLogo((prev) => ({ ...prev, [projectId]: false }))
    }, 500)
  }

  const handleNextImage = (projectId: number, totalImages: number) => {
    const currentIndex = currentImageIndex[projectId] || 0
    const nextIndex = (currentIndex + 1) % totalImages
    handleImageChange(projectId, nextIndex)
  }

  const handlePrevImage = (projectId: number, totalImages: number) => {
    const currentIndex = currentImageIndex[projectId] || 0
    const prevIndex = (currentIndex - 1 + totalImages) % totalImages
    handleImageChange(projectId, prevIndex)
  }

  const onTouchStart = (projectId: number, e: React.TouchEvent) => {
    setTouchEnd({ ...touchEnd, [projectId]: 0 })
    setTouchStart({ ...touchStart, [projectId]: e.targetTouches[0].clientX })
  }

  const onTouchMove = (projectId: number, e: React.TouchEvent) => {
    setTouchEnd({ ...touchEnd, [projectId]: e.targetTouches[0].clientX })
  }

  const onTouchEnd = (projectId: number, totalImages: number) => {
    const start = touchStart[projectId] || 0
    const end = touchEnd[projectId] || 0
    if (!start || !end) return

    const distance = start - end
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNextImage(projectId, totalImages)
    }
    if (isRightSwipe) {
      handlePrevImage(projectId, totalImages)
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

        {categories.length > 2 && (
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-border bg-card p-1 shadow-sm flex-wrap gap-1 justify-center">
              {categories.map((button) => (
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
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const currentIndex = currentImageIndex[project.id] || 0
            const isLogoVisible = showLogo[project.id] || false
            return (
              <Card key={project.id} className="overflow-hidden border-border hover:shadow-lg transition-all group">
                <CardContent className="p-0">
                  <div
                    className="relative aspect-[3/2] overflow-hidden"
                    onTouchStart={(e) => onTouchStart(project.id, e)}
                    onTouchMove={(e) => onTouchMove(project.id, e)}
                    onTouchEnd={() => onTouchEnd(project.id, project.images.length)}
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
                        src="/ygo_logo_primary.svg"
                        alt="YGO Logo"
                        width={120}
                        height={120}
                        className="animate-pulse"
                      />
                    </div>

                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={() => handlePrevImage(project.id, project.images.length)}
                          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10 items-center justify-center"
                          aria-label="Önceki görsel"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                          onClick={() => handleNextImage(project.id, project.images.length)}
                          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10 items-center justify-center"
                          aria-label="Sonraki görsel"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                          {project.images.map((_, imgIndex) => (
                            <button
                              key={imgIndex}
                              onClick={() => handleImageChange(project.id, imgIndex)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                currentIndex === imgIndex ? "bg-primary w-8" : "bg-white/60 hover:bg-white/80"
                              }`}
                              aria-label={`Görsel ${imgIndex + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-12 gap-4 mb-2">
                      <div className="col-span-8">
                        <p className="text-sm text-primary font-semibold mb-2">{project.category}</p>
                        <h3 className="text-xl font-bold">{project.title}</h3>
                      </div>
                      <div className="col-span-4 flex justify-end items-center">
                        {project.clientLogo && (
                          <div className="relative w-32 h-12 opacity-80 hover:opacity-100 transition-opacity">
                            <Image
                              src={project.clientLogo}
                              alt="Client Logo"
                              fill
                              className="object-contain object-right"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {showViewAll && (
            <div className="mt-12 text-center">
                <Link
                href="/Projeler"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                >
                Hepsini Görüntüle
                </Link>
            </div>
        )}
      </div>
    </section>
  )
}
