import { UserMenu } from '@/components/authentication/user-menu'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <div className="w-full bg-slate-700 h-14 ">
        <div className="flex justify-between items-center h-full px-12">
          <div className="text-white">Bolttech TODO List</div>
          <UserMenu />
        </div>
      </div>
      {children}
    </div>
  )
}
