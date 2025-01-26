'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation' // Reemplazo de useRouter en App Router
import React from 'react'
import { FaHome, FaUser, FaInfoCircle } from 'react-icons/fa'

const Navegacion = () => {
  const pathname = usePathname()

  return (
    <nav className='bg-blue-900 text-slate-300 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Gestión de Estudiantes</h1>
        <ul className='flex space-x-6'>
          <li>
            <Link
              href='/'
              className={`flex items-center space-x-2 ${
                pathname === '/' ? 'text-blue-300' : ''
              } hover:text-blue-500 transition-colors duration-300`}
            >
              <FaHome />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link
              href='/personal'
              className={`flex items-center space-x-2 ${
                pathname === '/personal' ? 'text-blue-300' : ''
              } hover:text-blue-300 transition-colors duration-300`}
            >
              <FaUser />
              <span>Perfil</span>
            </Link>
          </li>
          <li>
            <Link
              href='/sobre'
              className={`flex items-center space-x-2 ${
                pathname === '/sobre' ? 'text-blue-300' : ''
              } hover:text-blue-300 transition-colors duration-300`}
            >
              <FaInfoCircle />
              <span>Sobre nosotros</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navegacion
