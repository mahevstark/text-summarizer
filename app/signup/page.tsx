import { redirect } from 'next/navigation'
import { checkAuth } from '../actions/auth'
import SignupForm from './SignupForm'

export default async function SignupPage() {
  const user = await checkAuth()
  
  if (user) {
    redirect('/dashboard')
  }

  return <SignupForm />
} 