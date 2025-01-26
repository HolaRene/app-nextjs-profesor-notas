'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProfesorLogin } from '@/interfaces/Auth'
import { useRouter } from 'next/navigation' // Importa useRouter
import { loginZodSchema } from '@/zodEsquema/zodform'
import { LoginFormInputs } from '@/types/tipos'
import { useAuth } from '@/context/authContext'
import Link from 'next/link'

// Tipo inferido del esquema

const Login = () => {
  const navegarA = useRouter() // Inicializa el router

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginZodSchema),
  })

  const { iniciarIn, error: loginError, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) navegarA.push('/personal')
  }, [isAuthenticated])

  const onSubmit = async (datos: ProfesorLogin) => {
    iniciarIn(datos)
  }

  return (
    <div className='max-w-md mx-auto p-6 bg-gray-300 shadow rounded mt-2'>
      <h1 className='text-2xl font-bold mb-4  text-gray-800'>Iniciar Sesión</h1>
      {loginError && (
        <p className='text-slate-50 text-center bg-red-500 text-sm mt-1 p-2 rounded-md'>
          {loginError}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label htmlFor='correo' className='block font-medium  text-gray-800'>
            Correo Electrónico
          </label>
          <input
            id='correo'
            type='email'
            {...register('correo')}
            className='w-full border rounded px-3 py-2  text-gray-800'
          />
          {errors.correo && (
            <p className='text-red-500 text-sm'>{errors.correo.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='password'
            className='block font-medium  text-gray-800'
          >
            Contraseña
          </label>
          <input
            id='password'
            type='password'
            {...register('password')}
            className='w-full border rounded px-3 py-2  text-gray-800'
          />
          {errors.password && (
            <p className='text-red-500 text-sm'>{errors.password.message}</p>
          )}
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
        <p className='text-gray-700'>
          ¿No tienes una cuenta?{' '}
          <Link href='/registro' className='text-blue-500 hover:underline'>
            Registrarse
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
