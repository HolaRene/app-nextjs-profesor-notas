'use client'
import { useEffect, useState } from 'react'
import { obtenerEstudiantes } from '@/peticiones/estudiantes'
import { Estudiante } from '@/interfaces/estudiantes'

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])

  // Obtener los datos del backend al montar el componente
  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const respuesta = await obtenerEstudiantes()
        setEstudiantes(respuesta.data) // Guardar los estudiantes en el estado
      } catch (error) {
        console.error('Error al obtener estudiantes:', error)
      }
    }

    fetchEstudiantes()
  }, [])

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Estudiantes Encontrados</h1>
      {estudiantes.length > 0 ? (
        <ul className='space-y-4'>
          {estudiantes.map(estudiante => (
            <li key={estudiante._id} className='p-4 border rounded shadow'>
              <h2 className='text-xl font-semibold'>
                {estudiante.nombre} {estudiante.apellido}
              </h2>
              <p>Edad: {estudiante.edad}</p>
              <p>Sexo: {estudiante.sexo}</p>
              <p>Grado: {estudiante.grado}</p>
              <p className='text-gray-600'>{estudiante.description}</p>
              <p className='text-sm text-gray-500'>
                Creado el: {new Date(estudiante.createdAt).toLocaleDateString()}
              </p>
              <p className='text-sm text-gray-500'>
                Actualizado el:{' '}
                {new Date(estudiante.updatedAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-gray-500'>No se encontraron estudiantes.</p>
      )}
    </div>
  )
}

export default Estudiantes
