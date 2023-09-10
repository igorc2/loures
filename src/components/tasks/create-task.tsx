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

interface CreateTaskProps {
  projectId: number
}

export function CreateTask({ projectId }: CreateTaskProps) {
  const router = useRouter()
  const { setProjects, projects } = useProjects()
  const [newTaskName, setNewTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [finishDate, setFinishDate] = useState<Date>()

  const handleAddTask = () => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      router.push('/')
    } else {
      axios
        .post(
          'http://localhost:3700/tasks',
          { name: newTaskName, description, finishDate, projectId },
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
                project.tasks.push(response.data)
              }
              return project
            })
          )
        })
    }
  }

  return (
    <>
      <Input
        name="newTask"
        value={newTaskName}
        type="text"
        placeholder="Add a task"
        onChange={(e) => setNewTaskName(e.target.value)}
      />
      <Dialog>
        <DialogTrigger>
          <Button>Add</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new task</DialogTitle>
            <DialogDescription>{newTaskName}</DialogDescription>
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
              setDescription(e.target?.value)
            }
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !finishDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {finishDate ? (
                  format(finishDate, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={finishDate}
                onSelect={setFinishDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <DialogFooter>
            <DialogClose>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddTask}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
