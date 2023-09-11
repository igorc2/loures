import { useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import axios from 'axios'
import { useProjects } from '../projects/projects-context'
import { BiPencil } from 'react-icons/bi'

interface EditProjectProps {
  projectId: number
  projectName: string
}

export function EditProject({ projectId, projectName }: EditProjectProps) {
  const { setProjects, projects } = useProjects()
  const [newProjectName, setNewProjectName] = useState(projectName)

  const handleCancel = () => {
    resetForm()
  }

  const resetForm = () => {
    setNewProjectName('')
  }

  const handleUpdateProject = () => {
    const accessToken = localStorage.getItem('accessToken')
    axios
      .put(
        `http://localhost:3700/projects/${projectId}`,
        {
          name: newProjectName,
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
                name: newProjectName,
              }
            }
            return project
          })
        )
      })
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="cursor-pointer">
            <BiPencil onClick={() => console.log('Edit project')} />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-6">
            <DialogTitle>Change project name</DialogTitle>
          </DialogHeader>
          <Input
            name="newTaskIn"
            value={newProjectName}
            type="text"
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <DialogFooter>
            <DialogClose>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                disabled={!newProjectName || !newProjectName.length}
                className="ml-4"
                onClick={handleUpdateProject}
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
