import { ProjectsProvider } from '@/components/projects/projects-context'
import { ProjectsList } from '@/components/projects/projects-list'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 bg-slate-100">
      <ProjectsProvider>
        <ProjectsList />
      </ProjectsProvider>
    </main>
  )
}
