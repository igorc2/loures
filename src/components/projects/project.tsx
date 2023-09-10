import axios from 'axios'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardHeaderControl,
  CardTitle,
} from '../ui/card'
import { BiPencil } from 'react-icons/bi'
import { BiTrash } from 'react-icons/bi'
import { Task } from '../tasks/task'
import { useState } from 'react'
import { useProjects } from './projects-context'
import { CreateTask } from '../tasks/create-task'

interface Tasks {
  id: number
  name: string
  statusId: number
}

interface ProjectProps {
  id: number
  name: string
  tasks: Tasks[]
}

export function Project({ id, name, tasks }: ProjectProps) {
  const { setProjects, projects } = useProjects()

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
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardHeaderControl>
          <div className="cursor-pointer">
            <BiPencil onClick={() => console.log('Edit project')} />
          </div>
          <div className="cursor-pointer">
            <BiTrash onClick={handleDeleteProject} />
          </div>
        </CardHeaderControl>
      </CardHeader>
      <CardContent>
        {tasks &&
          tasks.map((task) => (
            <Task key={task.id} name={task.name} statusId={task.statusId} />
          ))}
      </CardContent>
      <CardFooter>
        {/* <Input
          name="newTask"
          value={newTaskName}
          type="text"
          placeholder="Add a task"
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <Button onClick={handleAddTask}>Add</Button> */}
        <CreateTask projectId={id} />
      </CardFooter>
    </Card>
  )
}
