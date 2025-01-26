'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import { profesorById } from '@/peticiones/profesores' // Asegúrate de importar la función correcta // Asegúrate de importar la interfaz correcta
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
      if (userExistente?.datos?.id) {
        try {
          const profesorData = await profesorById(userExistente.datos.id)
          setProfesor(profesorData)
        } catch (error) {
          console.error('Error al obtener los datos del profesor:', error)
          setError('Error al obtener los datos del profesor')
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchProfesor()
  }, [userExistente])

  if (loading) {
    return <p>Cargando...</p> // Muestra un mensaje de carga mientras se hace la petición
  }

  if (error) {
    return <p className='text-red-500'>{error}</p> // Muestra un mensaje de error si la petición falla
  }

  return (
    <div className='flex-1 p-8 bg-gray-100'>
      {/* Bienvenida */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>
          Bienvenido, {profesor?.nombre || 'Usuario'}!
        </h1>
        <p className='text-gray-600'>
          Aquí puedes gestionar tu perfil y actividades.
        </p>
      </div>

      {/* Mostrar los datos del profesor */}
      {profesor && (
        <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            Datos del Profesor
          </h2>
          <div className='space-y-2'>
            <p className='text-gray-500'>
              <strong className='text-gray-800'>Nombre:</strong>{' '}
              {profesor.nombre}
            </p>
            <p className='text-gray-500'>
              <strong className='text-gray-800'>Apellido:</strong>{' '}
              {profesor.apellido}
            </p>
            <p className='text-gray-500'>
              <strong className='text-gray-800'>Correo:</strong>{' '}
              {profesor.correo}
            </p>
            <p className='text-gray-500'>
              <strong className='text-gray-800'>Grado:</strong> {profesor.grado}
            </p>
            <p className='text-gray-500'>
              <strong className='text-gray-800'>Materias:</strong>{' '}
              {profesor.materias.join(', ')}
            </p>
          </div>
          <Link
            className='text-gray-700 bg-red-400 p-2  rounded-md mr-2 '
            href={`/personal/perfil/editar/${profesor._id}`}
          >
            Editar Perfil
          </Link>
        </div>
      )}
      <ActividadesPersonal />
    </div>
  )
}

export default PersonalDashboard
