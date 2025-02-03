'use client'

import { useAuth } from '@/context/authContext'
import { useEstudiantes } from '@/context/estudiantesContext'
import Link from 'next/link'

const Estudiantes = () => {
  const {
    estudiantes = [],
    loading,
    getEstudiantes,
    getEstudianteByProfesor,
  } = useEstudiantes() // Valor predeterminado para estudiantes
  const { userExistente } = useAuth()
  console.log('Estudiante', estudiantes)
  const id = userExistente?.datos.id
  if (loading) {
    return <p className='text-white'>Cargando estudiantes...</p>
  }

  return (
    <div className='p-8 bg-gray-100'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>
        Estudiantes Encontrados
      </h1>
      <Link
        href={`/personal/estudiantes/nuevo/`}
        className='bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-yellow-600'
      >
        Crear Estudiante
      </Link>
      <button
        onClick={() => getEstudiantes()}
        className='mb-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'
      >
        Recargar Estudiantes
      </button>
      <button
        onClick={() => getEstudianteByProfesor(id)}
        className='mb-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'
      >
        Mis estudiantes
      </button>
      <div className='space-y-4'>
        {estudiantes.length > 0 ? (
          estudiantes.map(estudiante => (
            <div
              key={estudiante._id}
              className='bg-white p-6 rounded-lg shadow-md'
            >
              <h2 className='text-xl font-semibold text-gray-800'>
                {estudiante.nombre} {estudiante.apellido}
              </h2>
              <p className='text-gray-600'>
                <strong className='text-gray-800'>Edad:</strong>{' '}
                {estudiante.edad}
              </p>
              <p className='text-gray-600'>
                <strong className='text-gray-800'>Sexo:</strong>{' '}
                {estudiante.sexo}
              </p>
              <p className='text-gray-600'>
                <strong className='text-gray-800'>Grado:</strong>{' '}
                {estudiante.grado}
              </p>
              <p className='text-gray-600'>
                <strong className='text-gray-800'>Descripción:</strong>{' '}
                {estudiante.description}
              </p>
              <p className='text-gray-600'>
                <strong className='text-gray-800'>Fecha de creación:</strong>{' '}
                {new Date(estudiante.createdAt).toLocaleDateString()}
              </p>
              <p className='text-gray-600'>
                <strong className='text-gray-800'>Última actualización:</strong>{' '}
                {new Date(estudiante.updatedAt).toLocaleDateString()}
              </p>

              {/* Botones de acción */}
              <div className='flex space-x-4 mt-4'>
                <Link
                  href={`/personal/estudiantes/editar-estudiante/${estudiante._id}`}
                  className='bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600'
                >
                  Editar Estudiante
                </Link>
                <Link
                  href={`/personal/notas/nueva/${estudiante._id}`}
                  className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600'
                >
                  Ver Notas
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No se encontraron estudiantes.</p>
        )}
      </div>
    </div>
  )
}

export default Estudiantes
