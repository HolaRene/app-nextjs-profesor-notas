'use client'
import Link from 'next/link'
import { FaPowerOff } from 'react-icons/fa'
import LinksNav from './LinksNav'
import { useAuth } from '@/context/authContext'

export default function AsideNav() {
  const { logout } = useAuth() // Importamos la función de logout del contexto
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      <Link
        href={'#'}
        className='mb-2 flex h-20 items-end justify-start bg-slate-800 p-4 md:h-40'
      >
        <div className='w-32 text-white md:w-40'>JOe</div>
      </Link>
      <div className='flex flex-grow justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <LinksNav />

        <div className='hidden h-auto w-full grow md:block'></div>
        <button
          onClick={logout} // Llama a handleLogout al hacer clic
          className='flex h-[40px] grow items-center justify-center gap-2 rounded-md bg-slate-700 p-3 text-lg text-white font-bold hover:bg-slate-400 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3'
        >
          <FaPowerOff />
          <p className='hidden md:block'>Salir</p>
        </button>
      </div>
    </div>
  )
}
