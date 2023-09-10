import { Checkbox } from '@/components/ui/checkbox'
import { BiTrash } from 'react-icons/bi'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface TaskProps {
  name: string
  statusId: number
}

export function Task({ name, statusId }: TaskProps) {
  const router = useRouter()
  const handleDeleteTask = () => {
    console.log('Delete project')
  }

  const handleDeleteProject = () => {
    console.log('Delete project')
    const accessToken = localStorage.getItem('accessToken')
    axios
      .delete(`http://localhost:3700/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        setProjects(
          projects.filter((project) => {
            return project.id !== id
          })
        )
      })
  }

  return (
    <div className="flex justify-between mb-2 group">
      <div>
        <Checkbox className="mt-1 mr-2" />
        <span>{name}</span>
      </div>
      <div className="cursor-pointer hidden group-hover:block">
        <BiTrash onClick={handleDeleteTask} />
      </div>
    </div>
  )
}
