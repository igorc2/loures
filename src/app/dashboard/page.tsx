import { ProjectsProvider } from '@/components/projects/projects-context'
import { ProjectsList } from '@/components/projects/projects-list'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProjectsProvider>
        <ProjectsList />
      </ProjectsProvider>
    </main>
  )
}
