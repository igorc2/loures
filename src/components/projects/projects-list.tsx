'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Project } from './project'
import { useProjects } from './projects-context'
import { CreateProject } from './create-project'

interface Task {
  id: number
  name: string
  statusId: number
}

interface Project {
  id: number
  name: string
  tasks: Task[]
}

export function ProjectsList() {
  const router = useRouter()

  const { projects, setProjects } = useProjects()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      router.push('/')
    } else {
      axios
        .get('http://localhost:3700/projects', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setProjects(response.data)
        })
    }
  }, [])

  return (
    <main className="flex gap-6 flex-wrap items-center p-16">
      {projects.length !== 0
        ? projects.map((project) => (
            <Project
              id={project.id}
              name={project.name}
              tasks={project.tasks}
              key={project.id}
            />
          ))
        : null}
      <CreateProject />
    </main>
  )
}
