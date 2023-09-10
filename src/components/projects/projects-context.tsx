"use client"

import { ReactNode, createContext, useContext, useState } from "react"

interface Task {
  id: number;
  name: string;
  statusId: number;
}

interface Project {
  id: number;
  name: string;
  tasks: Task[];
}

interface ProjectsContextProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  newTaskName: string,
  setNewTaskName: (newTaskName: string) => void,
  newProjectName: string,
  setNewProjectName: (newProjectName: string) => void,
}

export const ProjectsContext = createContext<ProjectsContextProps | undefined>(undefined);

export const useProjects = () => {

  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within an ProjectsProvider');
  }
  return context;
}

export function ProjectsProvider({ children }: { children: ReactNode }) {

  const [projects, setProjects] = useState<Project[]>([])
  const [newTaskName, setNewTaskName] = useState("")
  const [newProjectName, setNewProjectName] = useState("")

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <ProjectsContext.Provider value={{
        projects,
        setProjects,
        newTaskName,
        setNewTaskName,
        newProjectName,
        setNewProjectName,
      }}>
        {children}
      </ProjectsContext.Provider>
    </main>
  )
}