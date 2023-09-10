import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Input } from '../ui/input'
import { useProjects } from './projects-context'
import axios from 'axios'

export function CreateProject() {
  const { newProjectName, setNewProjectName, projects, setProjects } =
    useProjects()

  const handleAddProject = () => {
    const accessToken = localStorage.getItem('accessToken')
    axios
      .post(
        'http://localhost:3700/projects',
        { name: newProjectName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        setProjects([...projects, response.data])
      })
  }

  return (
    <Card className="bg-slate-300 w-96">
      <CardContent>
        <h2 className="text-3xl text-center font-semibold py-6">
          Create a new project
        </h2>
        <Input
          name="newProject"
          value={newProjectName}
          type="text"
          placeholder="Project name"
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <Button className="mt-8 center" onClick={handleAddProject}>
          Create Project
        </Button>
      </CardContent>
    </Card>
  )
}
