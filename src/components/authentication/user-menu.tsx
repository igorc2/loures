'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { useRouter } from 'next/navigation'

export function UserMenu() {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    router.push('/')
  }

  const userName = localStorage.getItem('userName')

  return (
    <div className="group block">
      <div className="h-10 w-10 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-slate-100">
        <div className="h-10 w-10 flex center text-center">
          <span className="w-10 text-l font-bold h-10 mt-2 text-center">
            {userName?.[0]}
          </span>
        </div>
        <div className="hidden group-hover:block drop-down w-48 overflow-hidden bg-white rounded-md shadow absolute top-10 right-3">
          <ul>
            <li
              onClick={handleLogout}
              className="px-3  py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </span>
              <span> Logout </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
