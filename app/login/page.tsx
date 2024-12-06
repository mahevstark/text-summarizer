import { redirect } from 'next/navigation'
import { checkAuth } from '../actions/auth'
import LoginForm from './LoginForm'

export default async function LoginPage() {
  const user = await checkAuth()
  
  if (user) {
    redirect('/dashboard')
  }

  return <LoginForm />
}
