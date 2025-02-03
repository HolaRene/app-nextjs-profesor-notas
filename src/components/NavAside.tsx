'use client'
import Link from 'next/link'
import { FaPowerOff } from 'react-icons/fa'
import LinksNav from './LinksNav'
import { useAuth } from '@/context/authContext'
import Image from 'next/image'

export default function AsideNav() {
  const { logout } = useAuth()

  return (
    <div className='flex h-full flex-col px-4 py-6 md:px-6 bg-slate-800 text-white'>
      {/* Logo */}
      <Link
        href={'#'}
        className='mb-6 flex items-center justify-center rounded-lg shadow-md overflow-hidden'
      >
        {/* Imagen del logo */}
        <Image
          src='/images.png'
          alt='Logo'
          width={64} // Ancho de la imagen
          height={64} // Altura de la imagen
          className='object-cover rounded-full'
          priority // Prioriza la carga de esta imagen crítica
        />
      </Link>

      {/* Navigation Links */}
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <LinksNav />
        <div className='hidden h-auto w-full grow md:block'></div>
        <button
          onClick={logout}
          className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-500 p-3 text-lg text-white font-bold hover:bg-slate-400 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3'
        >
          <FaPowerOff className='w-6' />
          <p className='hidden md:block'>Logout</p>
        </button>
      </div>
    </div>
  )
}
