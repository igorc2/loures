import { useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useProjects } from '../projects/projects-context'
import { Textarea } from '../ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '../ui/calendar'
import { BiPencil } from 'react-icons/bi'

interface EditTaskProps {
  id: number
  projectId: number
  name: string
  description?: string
  finishDate?: Date
}

export function EditTask({
  id,
  projectId,
  name,
  description,
  finishDate,
}: EditTaskProps) {
  const router = useRouter()
  const { setProjects, projects } = useProjects()
  const [newTaskName, setNewTaskName] = useState(name)
  const [newDescription, setNewDescription] = useState(description)
  const [newFinishDate, setNewFinishDate] = useState<Date | undefined>(
    finishDate ? new Date(finishDate) : undefined
  )

  const handleCancel = () => {
    resetForm()
  }

  const resetForm = () => {
    setNewTaskName('')
    setNewDescription('')
    setNewFinishDate(undefined)
  }

  const handleAddTask = () => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      router.push('/')
    } else {
      axios
        .put(
          `http://localhost:3700/tasks/${id}`,
          {
            name: newTaskName,
            description: newDescription,
            finishDate: newFinishDate,
            projectId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setProjects(
            projects.map((project) => {
              if (project.id === projectId) {
                return {
                  ...project,
                  tasks: project.tasks.map((task) => {
                    if (task.id === id) {
                      return response.data
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
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="cursor-pointer">
            <BiPencil />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-6">
            <DialogTitle>Add new task</DialogTitle>
          </DialogHeader>
          <Input
            name="newTaskIn"
            value={newTaskName}
            type="text"
            placeholder="Add a task"
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <Textarea
            placeholder="Add a description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setNewDescription(e.target?.value)
            }
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !newFinishDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {newFinishDate ? (
                  format(newFinishDate, 'PPP')
                ) : (
                  <span>Finish date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={newFinishDate}
                onSelect={setNewFinishDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <DialogFooter>
            <DialogClose>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                disabled={!newTaskName || !newTaskName.length}
                className="ml-4"
                onClick={handleAddTask}
              >
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
