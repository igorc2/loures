import { Checkbox } from '@/components/ui/checkbox'
import { BiTrash } from 'react-icons/bi'
import axios from 'axios'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useProjects } from '../projects/projects-context'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { EStatusCode } from '../projects/project'
import { Edit } from 'lucide-react'
import { EditTask } from './edit-task'

interface TaskProps {
  id: number
  name: string
  projectId: number
  statusId: number
  finishDate?: Date
}

export function Task({ id, name, projectId, statusId, finishDate }: TaskProps) {
  const { setProjects, projects } = useProjects()

  const handleChange = () => {
    console.log('Change status')
    const accessToken = localStorage.getItem('accessToken')
    axios
      .put(
        `http://localhost:3700/tasks/${id}`,
        {
          statusId:
            statusId === EStatusCode.TODO ? EStatusCode.DONE : EStatusCode.TODO,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        setProjects(
          projects.map((project) => {
            if (project.id === projectId) {
              return {
                ...project,
                tasks: project.tasks.map((task) => {
                  if (task.id === id) {
                    return {
                      ...task,
                      statusId:
                        statusId === EStatusCode.TODO
                          ? EStatusCode.DONE
                          : EStatusCode.TODO,
                    }
                  }
                  return task
                }),
              }
            }
            return project
          })
        )
      })
  }

  const handleDeleteTask = () => {
    console.log('Delete project')
    const accessToken = localStorage.getItem('accessToken')
    axios
      .delete(`http://localhost:3700/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        setProjects(
          projects.map((project) => {
            if (project.id === projectId) {
              return {
                ...project,
                tasks: project.tasks.filter((task) => {
                  return task.id !== id
                }),
              }
            }
            return project
          })
        )
      })
  }

  return (
    <div
      className={cn(
        'flex justify-between mb-2 group',
        statusId === EStatusCode.TODO && 'text-blue-800',
        statusId === EStatusCode.DONE && 'text-green-900'
      )}
    >
      <div>
        <Checkbox
          checked={statusId === EStatusCode.DONE}
          onCheckedChange={handleChange}
          className="mt-1 mr-2"
        />
        {finishDate ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span>{name}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Finish date: {format(new Date(finishDate), 'dd-MM-yyyy')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span>{name}</span>
        )}
      </div>

      {statusId === EStatusCode.TODO && (
        <div className="cursor-pointer hidden items-center flex group-hover:flex gap-4">
          <EditTask
            id={id}
            name={name}
            finishDate={finishDate}
            projectId={projectId}
          />
          <BiTrash onClick={handleDeleteTask} />
        </div>
      )}
    </div>
  )
}
