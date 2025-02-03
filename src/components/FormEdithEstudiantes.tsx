'use client'
import { useEstudiantes } from '@/context/estudiantesContext'
import {
  EstudianteForm,
  EstudianteResponseById,
} from '@/interfaces/estudiantes'
import { estudianteActualizarZodSchema } from '@/zodEsquema/zodform'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormComponentNotas {
  id: string
}

function FormEditEstudiante({ id }: FormComponentNotas) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EstudianteForm>({
    resolver: zodResolver(estudianteActualizarZodSchema),
  })
  const [estudianteId, setEstudianteId] = useState<EstudianteResponseById>()
  const navegar = useRouter()
  const {
    getEstudianteById,
    putEstudiante,
    error: EstudianteActulizarError,
  } = useEstudiantes()
  // Obtener los datos de la nota por ID
  useEffect(() => {
    const estudiantePorId = async () => {
      try {
        const response = await getEstudianteById(id)
        console.log('Respuesta del estudiante por id:', response)
        setEstudianteId(response)
      } catch (error) {
        console.error('Error al obtener los datos de la nota:', error)
      }
    }

    estudiantePorId()
  }, [id])

  // Prellenar el formulario cuando notasID esté disponible
  useEffect(() => {
    if (estudianteId) {
      // Prellenar el formulario con los datos obtenidos
      reset({
        nombre: estudianteId.data.nombre, // ID del estudiante
        grado: estudianteId.data.grado as 'quinto' | 'cuarto' | 'sexto', // Type assertion
        apellido: estudianteId.data.apellido, // Calificación
        profesorId: estudianteId.data.profesorId, // ID del profesor (opcional)
        edad: estudianteId.data.edad, // ID del profesor (opcional)
        sexo: estudianteId.data.genero as 'masculino' | 'femenino', // ID del profesor (opcional)
      })
    }
  }, [estudianteId]) // Este efecto se ejecuta cuando notasID cambia

  const onSubmit = async (datos: EstudianteForm) => {
    putEstudiante(id, datos)
    if (!EstudianteActulizarError) {
      navegar.push('/personal/estudiantes')
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-lg mx-auto p-4 space-y-4 bg-gray-300 rounded shadow mt-1'
      >
        {EstudianteActulizarError && (
          <p className='text-slate-50 bg-red-500 text-sm mt-1 p-2 rounded-md'>
            {EstudianteActulizarError}
          </p>
        )}
        <h2 className='text-2xl font-bold text-gray-800'>
          Actualizar Estudiante
        </h2>

        {/* Campos del formulario */}
        <div>
          <label htmlFor='estudianteNombre' className='block text-gray-700'>
            Nombre
          </label>
          <input
            id='estudianteNombre'
            type='text'
            {...register('nombre')}
            className='w-full p-2 border rounded text-slate-800 bg-gray-200'
          />
          {errors.nombre && (
            <p className='text-red-500'>{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='estudianteApellido' className='block text-gray-700'>
            Apellido
          </label>
          <input
            id='estudianteApellido'
            type='text'
            {...register('apellido')}
            className='w-full p-2 border rounded text-slate-800 bg-gray-200'
          />
          {errors.apellido && (
            <p className='text-red-500'>{errors.apellido.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='estudianteProfesorId' className='block text-gray-700'>
            Profesor Id
          </label>
          <input
            id='estudianteProfesorId'
            type='text'
            {...register('profesorId')}
            className='w-full p-2 border rounded text-slate-800 bg-gray-200'
            disabled
          />
          {errors.profesorId && (
            <p className='text-red-500'>{errors.profesorId.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='grado' className='block font-medium text-gray-800'>
            Grado
          </label>
          <select
            id='grado'
            {...register('grado')}
            className='w-full border rounded px-3 py-2 text-gray-800'
            disabled
          >
            <option value=''>Selecciona un grado</option>
            <option value='sexto'>Sexto</option>
            <option value='cuarto'>Cuarto</option>
            <option value='quinto'>Quinto</option>
          </select>
          {errors.grado && (
            <p className='text-red-500 text-sm'>{errors.grado.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='profesor' className='block text-gray-700'>
            Sexo
          </label>
          <input
            id='profesor'
            type='text'
            {...register('sexo')}
            className='w-full p-2 border rounded text-slate-800 bg-gray-200'
            disabled
          />
          {errors.sexo && <p className='text-red-500'>{errors.sexo.message}</p>}
        </div>

        <div>
          <label htmlFor='calificacion' className='block text-gray-700'>
            Edad
          </label>
          <input
            id='calificacion'
            type='number'
            {...register('edad', { valueAsNumber: true })}
            className='w-full p-2 border rounded text-slate-800'
            placeholder='Edad (5-20)'
            min={5}
            max={20}
          />
          {errors.edad && <p className='text-red-500'>{errors.edad.message}</p>}
        </div>

        <button
          type='submit'
          className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Actualizar Estudiante
        </button>

        <p className='text-gray-700'>
          ¿Necesitas registrar una nueva nota?{' '}
          <Link
            href='/registrar-nota'
            className='text-blue-500 hover:underline'
          >
            Regístrarla aquí
          </Link>
        </p>
      </form>
    </div>
  )
}

export default FormEditEstudiante
