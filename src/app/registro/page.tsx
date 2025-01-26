'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { authZodSchema } from '@/zodEsquema/zodform'
import Link from 'next/link'
import { AuthFormValues } from '@/types/tipos'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'

export default function Registro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authZodSchema),
  })
  const { registroUp, isAuthenticated, error: RegistroErrores } = useAuth()
  const navegarA = useRouter()

  useEffect(() => {
    if (isAuthenticated) navegarA.push('/personal')
  }, [isAuthenticated])
  const onSubmit = async (data: AuthFormValues) => {
    registroUp(data)
    // Aquí puedes hacer la petición al backend con los datos
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-lg mx-auto p-4 space-y-4 bg-gray-300 rounded shadow mt-1'
    >
      {RegistroErrores && (
        <p className='text-slate-50 bg-red-500 text-sm mt-1 p-2 rounded-md'>
          {RegistroErrores}
        </p>
      )}
      <h2 className='text-2xl font-bold text-gray-800'>Registro de profesor</h2>
      <div className='mt-1'>
        <label htmlFor='nombre' className='block text-gray-700'>
          Nombre
        </label>
        <input
          id='nombre'
          type='text'
          {...register('nombre')}
          className='w-full p-2 border rounded text-slate-800'
          placeholder='Nombre'
        />
        {errors.nombre && (
          <p className='text-red-500'>{errors.nombre.message}</p>
        )}
      </div>
      <div>
        <label htmlFor='codigo' className='block text-gray-700'>
          Código
        </label>
        <input
          id='codigo'
          type='text'
          {...register('codigo')}
          placeholder='Código de verificación'
          className='w-full p-2 border rounded text-slate-800'
        />
        {errors.codigo && (
          <p className='text-red-500'>{errors.codigo.message}</p>
        )}
      </div>
      <div>
        <label htmlFor='apellido' className='block text-gray-700'>
          Apellido
        </label>
        <input
          id='apellido'
          type='text'
          {...register('apellido')}
          className='w-full p-2 border rounded text-slate-800'
          placeholder='Apellido'
        />
        {errors.apellido && (
          <p className='text-red-500'>{errors.apellido.message}</p>
        )}
      </div>
      <div>
        <label htmlFor='grado' className='block text-gray-700'>
          Grado
        </label>
        <select
          id='grado'
          {...register('grado')}
          className='w-full p-2 border rounded text-slate-800'
        >
          <option value=''>Selecciona un grado</option>
          <option value='sexto'>Sexto</option>
          <option value='cuarto'>Cuarto</option>
          <option value='quinto'>Quinto</option>
        </select>
        {errors.grado && <p className='text-red-500'>{errors.grado.message}</p>}
      </div>
      <div>
        <label htmlFor='materias' className='block text-gray-700'>
          Materias
        </label>
        <div className='space-y-1 text-slate-800'>
          {['Ciencias', 'Historia', 'Matemáticas'].map(materia => (
            <label key={materia} className='block'>
              <input
                type='checkbox'
                value={materia}
                {...register('materias')}
                className='mr-2 text-slate-800'
              />
              {materia}
            </label>
          ))}
        </div>
        {errors.materias && (
          <p className='text-red-500'>{errors.materias.message}</p>
        )}
      </div>
      <div>
        <label htmlFor='correo' className='block text-gray-700'>
          Correo
        </label>
        <input
          id='correo'
          type='email'
          {...register('correo')}
          className='w-full p-2 border rounded text-slate-800'
          placeholder='Correo electrónico'
        />
        {errors.correo && (
          <p className='text-red-500'>{errors.correo.message}</p>
        )}
      </div>
      <div className='mb-4'>
        {/* Campo de contraseña */}
        <label htmlFor='password' className='block text-gray-700 font-medium'>
          Contraseña
        </label>
        <input
          id='password'
          type='password'
          {...register('password', {
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 5,
              message: 'La contraseña debe tener al menos 5 caracteres',
            },
          })}
          className='w-full p-2 border rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Contraseña'
        />
        {errors.password && (
          <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
        )}
      </div>
      <button
        type='submit'
        className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        Registrarse
      </button>
      <p className='text-gray-700'>
        ¿Ya tienes una cuenta?{' '}
        <Link href='/iniciar-sesion' className='text-blue-500 hover:underline'>
          Inicia sesión
        </Link>
      </p>
      <pre className='text-black'>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  )
}
