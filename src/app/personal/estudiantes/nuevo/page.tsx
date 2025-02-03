'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EstudianteFormInputs } from '@/types/tipos'
import { estudianteZodSchema } from '@/zodEsquema/zodform'
import Link from 'next/link'

import { useEstudiantes } from '@/context/estudiantesContext'
import { useRouter } from 'next/navigation'
const CrearEstudianteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EstudianteFormInputs>({
    resolver: zodResolver(estudianteZodSchema),
  })
  const navega = useRouter()
  const { postEstudiante, error: EstudianteError } = useEstudiantes()
  console.log(EstudianteError)

  const onSubmit = (data: EstudianteFormInputs) => {
    postEstudiante(data)
    if (EstudianteError === null) {
      navega.push('/personal/estudiantes')
    }
  }
  return (
    <div className='max-w-md mx-auto p-6 bg-gray-300 shadow rounded mt-2'>
      <h1 className='text-2xl font-bold mb-4 text-gray-800'>
        Crear Estudiante
      </h1>
      {EstudianteError && (
        <p className='text-slate-50 bg-red-500 text-sm mt-1 p-2 rounded-md'>
          {EstudianteError}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* Campo: Nombre */}
        <div>
          <label htmlFor='nombre' className='block font-medium text-gray-800'>
            Nombre
          </label>
          <input
            id='nombre'
            type='text'
            {...register('nombre')}
            className='w-full border rounded px-3 py-2 text-gray-800'
          />
          {errors.nombre && (
            <p className='text-red-500 text-sm'>{errors.nombre.message}</p>
          )}
        </div>

        {/* Campo: Apellido */}
        <div>
          <label htmlFor='apellido' className='block font-medium text-gray-800'>
            Apellido
          </label>
          <input
            id='apellido'
            type='text'
            {...register('apellido')}
            className='w-full border rounded px-3 py-2 text-gray-800'
          />
          {errors.apellido && (
            <p className='text-red-500 text-sm'>{errors.apellido.message}</p>
          )}
        </div>

        {/* Campo: Edad */}
        <div>
          <label htmlFor='edad' className='block font-medium text-gray-800'>
            Edad
          </label>
          <input
            id='edad'
            type='number'
            {...register('edad', { valueAsNumber: true })}
            className='w-full border rounded px-3 py-2 text-gray-800'
          />
          {errors.edad && (
            <p className='text-red-500 text-sm'>{errors.edad.message}</p>
          )}
        </div>

        {/* Campo: Grado */}
        <div>
          <label htmlFor='grado' className='block font-medium text-gray-800'>
            Grado
          </label>
          <select
            id='grado'
            {...register('grado')}
            className='w-full border rounded px-3 py-2 text-gray-800'
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

        {/* Campo: Sexo */}
        <div>
          <label htmlFor='sexo' className='block font-medium text-gray-800'>
            Sexo
          </label>
          <select
            id='sexo'
            {...register('sexo')}
            className='w-full border rounded px-3 py-2 text-gray-800'
          >
            <option value=''>Selecciona un sexo</option>
            <option value='masculino'>Masculino</option>
            <option value='femenino'>Femenino</option>
          </select>
          {errors.sexo && (
            <p className='text-red-500 text-sm'>{errors.sexo.message}</p>
          )}
        </div>

        {/* Campo: Descripción */}
        <div>
          <label
            htmlFor='description'
            className='block font-medium text-gray-800'
          >
            Descripción
          </label>
          <textarea
            id='description'
            {...register('description')}
            className='w-full border rounded px-3 py-2 text-gray-800'
          />
          {errors.description && (
            <p className='text-red-500 text-sm'>{errors.description.message}</p>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creando...' : 'Crear Estudiante'}
        </button>

        {/* Enlace a otra página */}
        <p className='text-gray-700'>
          ¿Necesitas ver la lista de estudiantes?{' '}
          <Link
            href='/personal/estudiantes'
            className='text-blue-500 hover:underline'
          >
            Ver estudiantes
          </Link>
        </p>
      </form>
    </div>
  )
}

export default CrearEstudianteForm
