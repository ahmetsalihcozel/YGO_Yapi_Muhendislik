import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Portfolio } from "@/components/portfolio"
import { getProjects } from "@/lib/projects"

export default function ProjectsPage() {
  const projects = getProjects()

  return (
    <main className="min-h-screen">
      <Portfolio projects={projects} showViewAll={false} />
    </main>
  )
}
