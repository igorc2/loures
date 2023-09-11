'use client'
import * as z from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export function LoginForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [isRegistering, setIsRegistering] = useState(false)

  function onSubmit(values: z.infer<typeof formSchema>) {
    const route = isRegistering ? 'register' : 'login'
    axios
      .post(`http://localhost:3700/auth/${route}`, values)
      .then((response) => {
        localStorage.setItem('userName', response.data.name)
        localStorage.setItem('accessToken', response.data.token)
        router.push('/dashboard')
      })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="login" className="flex flex-col align-middle">
            <TabsList>
              <TabsTrigger
                onClick={() => setIsRegistering(false)}
                value="login"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setIsRegistering(true)}
                value="register"
              >
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent className="mt-4 text-xl" value="login">
              Login to your account
            </TabsContent>
            <TabsContent className="mt-4 text-xl" value="register">
              Register a new user
            </TabsContent>
          </Tabs>
          {isRegistering && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="•••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}
