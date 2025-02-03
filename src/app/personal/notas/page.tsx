'use client'
import { useEffect } from 'react'
import { useNotas } from '@/context/notasContext'
import Link from 'next/link'

const NotasPage = () => {
  const { notas, loading, error, obtenerNotas } = useNotas()

  // Llama a obtenerNotas cuando el componente se monte
  useEffect(() => {
    obtenerNotas()
  }, [])

  if (loading) {
    return <p>Cargando notas...</p> // Muestra un mensaje de carga
  }

  if (error) {
    return <p className='text-red-500'>{error}</p> // Muestra un mensaje de error
  }

  return (
    <div className='p-8 bg-gray-100'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>
        Notas de los Estudiantes
      </h1>
      <button
        onClick={obtenerNotas}
        className='mb-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'
      >
        Recargar Notas
      </button>
      <div className='space-y-4'>
        {notas.map(nota => (
          <div key={nota._id} className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold text-gray-800'>
              Estudiante: {nota.estudiante.nombre}
            </h2>
            <p className='text-gray-600'>
              <strong className='text-gray-800'>Materia:</strong> {nota.materia}
            </p>
            <p className='text-gray-600'>
              <strong className='text-gray-800'>Calificación:</strong>{' '}
              {nota.calificacion}
            </p>
            <p className='text-gray-600'>
              <strong className='text-gray-800'>Profesor:</strong>{' '}
              {nota.profesor.nombre}
            </p>
            <p className='text-gray-600'>
              <strong className='text-gray-800'>Fecha de creación:</strong>{' '}
              {new Date(nota.createdAt).toLocaleDateString()}
            </p>

            {/* Botones de edición */}
            <div className='flex space-x-4 mt-4'>
              <Link
                href={`/personal/estudiantes/editar-nota/${nota._id}`}
                className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600'
              >
                Editar Nota
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotasPage
