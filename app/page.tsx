import { redirect } from 'next/navigation'
import { checkAuth } from './actions/auth'

export default async function Home() {
  const user = await checkAuth()
  
  if (!user) {
    redirect('/login')
  }

  // If user is authenticated, redirect to dashboard
  redirect('/dashboard')
}

{/* <div className="bg-darkbg w-full min-h-screen justify-center items-center flex flex-col"> 
        <div className="flex flex-col gap-10 items-center">
        <Image
          src={logo}
          alt="logo"
          width={338}
          height={164}
        />  
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-white tracking-[0.7em] text-center">TEXT SUMMARIZER TASK</h1>
        </div>
    </div> */}