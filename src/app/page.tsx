import { LoginForm } from "@/components/authentication/login-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-60  bg-slate-500">
      <LoginForm />
    </main>
  )
}
