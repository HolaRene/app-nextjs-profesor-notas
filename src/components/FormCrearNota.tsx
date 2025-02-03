'use client'
import { useNotas } from '@/context/notasContext'
import { NotasForm } from '@/interfaces/notas'
import { notasZodSchema } from '@/zodEsquema/zodform'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface FormComponentNotas {
  id: string
}

function FormCrearNota({ id }: FormComponentNotas) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NotasForm>({
    resolver: zodResolver(notasZodSchema),
  })
  console.log(id)

  const navegar = useRouter()
  const { error: NotasErrores } = useNotas()
  console.log(NotasErrores)
  const onSubmit = async (datos: NotasForm) => {
    console.log('Datos del formulario:', datos)
    navegar.push('/personal/notas')
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-lg mx-auto p-4 space-y-4 bg-gray-300 rounded shadow mt-1'
      >
        {NotasErrores && (
          <p className='text-slate-50 bg-red-500 text-sm mt-1 p-2 rounded-md'>
            {NotasErrores}
          </p>
        )}
        <h2 className='text-2xl font-bold text-gray-800'>Crear Nota</h2>

        {/* Campo: Estudiante (no editable) */}
        <div>
          <label htmlFor='estudiante' className='block text-gray-700'>
            Estudiante
          </label>
          <input
            id='estudiante'
            type='text'
            {...register('estudiante')}
            className='w-full p-2 border rounded text-slate-800 bg-gray-200'
          />
          {errors.estudiante && (
            <p className='text-red-500'>{errors.estudiante.message}</p>
          )}
        </div>

        {/* Campo: Materia (no editable) */}
        <div>
          <label htmlFor='materia' className='block text-gray-700'>
            Materia
          </label>
          <select
            id='materia'
            {...register('materia')}
            className='w-full p-2 border rounded text-slate-800 bg-gray-200'
          >
            <option value=''>Selecciona una materia</option>
            <option value='Matemáticas'>Matemáticas</option>
            <option value='Ciencias'>Ciencias</option>
            <option value='Historia'>Historia</option>
          </select>
          {errors.materia && (
            <p className='text-red-500'>{errors.materia.message}</p>
          )}
        </div>

        {/* Campo: Profesor (no editable) */}
        <div>
          <label htmlFor='profesor' className='block text-gray-700'>
            Profesor
          </label>
          <input
            id='profesor'
            type='text'
            {...register('profesor')}
            className='w-full p-2 border rounded text-slate-800 bg-gray-200'
          />
          {errors.profesor && (
            <p className='text-red-500'>{errors.profesor.message}</p>
          )}
        </div>

        {/* Campo: Calificación (editable) */}
        <div>
          <label htmlFor='calificacion' className='block text-gray-700'>
            Calificación
          </label>
          <input
            id='calificacion'
            type='number'
            {...register('calificacion', { valueAsNumber: true })}
            className='w-full p-2 border rounded text-slate-800'
            placeholder='Calificación (0-100)'
            min={0}
            max={100}
          />
          {errors.calificacion && (
            <p className='text-red-500'>{errors.calificacion.message}</p>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type='submit'
          className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Actualizar Nota
        </button>

        {/* Enlace a otra página */}
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

export default FormCrearNota
