import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Portfolio } from "@/components/portfolio"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

import { getProjects } from "@/lib/projects"

export default function Page() {
  const projects = getProjects()
  const featuredProjects = projects.slice(0, 6)

  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Portfolio projects={featuredProjects} showViewAll={true} />
      <Contact />
    </main>
  )
}
