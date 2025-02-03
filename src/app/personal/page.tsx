'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import { profesorById } from '@/peticiones/profesores'
import { ProfesorResponse } from '@/interfaces/Auth'
import ActividadesPersonal from '@/components/ActividadesPersonal'
import Link from 'next/link'

const PersonalDashboard = () => {
  const { userExistente } = useAuth()
  const [profesor, setProfesor] = useState<ProfesorResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfesor = async () => {
      try {
        if (userExistente?.datos?.id) {
          const profesorData = await profesorById(userExistente.datos.id)
          setProfesor(profesorData)
        }
      } catch (error) {
        console.error('Error al obtener los datos del profesor:', error)
        setError('Error al obtener los datos del profesor')
      } finally {
        setLoading(false)
      }
    }

    // Agregar un pequeño delay para asegurar que userExistente esté disponible
    const timer = setTimeout(() => {
      fetchProfesor()
    }, 100)

    return () => clearTimeout(timer)
  }, [userExistente]) // Agregar userExistente como dependencia

  if (loading) {
    return <p className='p-4 text-gray-600'>Cargando datos del profesor...</p>
  }

  if (error) {
    return <p className='p-4 text-red-500'>{error}</p>
  }

  return (
    <div className='flex-1 p-8 bg-gray-100'>
      {/* Bienvenida */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>
          {profesor ? `Bienvenido, ${profesor.nombre}!` : 'Bienvenido!'}
        </h1>
        <p className='text-gray-600'>
          Aquí puedes gestionar tu perfil y actividades.
        </p>
      </div>

      {/* Tarjeta de datos del profesor */}
      {profesor && (
        <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
          <div className='flex justify-between items-start mb-4'>
            <h2 className='text-xl font-semibold text-gray-800'>
              Datos del Profesor
            </h2>
            <Link
              href={`/personal/perfil/editar/${profesor._id}`}
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors'
            >
              Editar Perfil
            </Link>
          </div>

          <div className='space-y-3'>
            <p className='text-gray-600'>
              <span className='font-medium text-gray-800'>
                Nombre completo:
              </span>{' '}
              {profesor.nombre} {profesor.apellido}
            </p>
            <p className='text-gray-600'>
              <span className='font-medium text-gray-800'>Correo:</span>{' '}
              {profesor.correo}
            </p>
            <p className='text-gray-600'>
              <span className='font-medium text-gray-800'>Grado asignado:</span>{' '}
              {profesor.grado}
            </p>
            <p className='text-gray-600'>
              <span className='font-medium text-gray-800'>Materias:</span>{' '}
              {profesor.materias.join(', ')}
            </p>
          </div>
        </div>
      )}

      <ActividadesPersonal />
    </div>
  )
}

export default PersonalDashboard
