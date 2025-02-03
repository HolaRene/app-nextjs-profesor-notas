'use client'

import { GetEstudiante, EstudianteForm } from '@/interfaces/estudiantes'
import {
  actualizarEstudiante,
  crearEstudiante,
  obtenerEstudiantePorId,
  obtenerEstudiantePorProfesor,
  obtenerEstudiantes,
} from '@/peticiones/estudiantes'
import { EstudianteFormInputs, EstudiantesContextType } from '@/types/tipos'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

const EstudianteContexto = createContext<EstudiantesContextType | undefined>(
  undefined
)

export const EstudiantesProvider = ({ children }: { children: ReactNode }) => {
  const [estudiantes, setEstudiantes] = useState<GetEstudiante[]>([]) // Inicializado como array vacío
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Función para obtener los estudiantes
  const getEstudiantes = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await obtenerEstudiantes()
      setEstudiantes(response.estudiantes) // Extrae `data` de la respuesta
    } catch (error) {
      setError('Error al obtener los estudiantes')
      console.error('Error al obtener los estudiantes:', error)
    } finally {
      setLoading(false)
    }
  }

  const postEstudiante = async (datos: EstudianteFormInputs) => {
    setLoading(true)
    setError(null)
    try {
      const res = await crearEstudiante(datos)
      console.log(res)
    } catch (error) {
      if (error instanceof Error) {
        // Si el error es una instancia de Error, extrae el mensaje
        setError(error.message)
      } else {
        // Si no es una instancia de Error, muestra un mensaje genérico
        setError('Error en el registro')
      }
    } finally {
      setLoading(false)
    }
  }
  const putEstudiante = async (id: string, datos: EstudianteForm) => {
    setLoading(true)
    setError(null)
    try {
      const res = await actualizarEstudiante(id, datos)
      console.log(res)
      return res
    } catch (error) {
      if (error instanceof Error) {
        // Si el error es una instancia de Error, extrae el mensaje
        setError(error.message)
      } else {
        // Si no es una instancia de Error, muestra un mensaje genérico
        setError('Error en el registro')
      }
    } finally {
      setLoading(false)
    }
  }

  const getEstudianteByProfesor = async (profesorId: string | undefined) => {
    setLoading(true)
    setError(null)
    try {
      const response = await obtenerEstudiantePorProfesor(profesorId)
      setEstudiantes(response.estudiantes)
    } catch (error) {
      setError('Error al obtener los estudiantes por profesor')
      console.error('Error al obtener los estudiantes por profesor:', error)
    } finally {
      setLoading(false)
    }
  }
  const getEstudianteById = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await obtenerEstudiantePorId(id)
      console.log(response)
      return response
    } catch (error) {
      setError('Error al obtener el estudiantes por id')
      console.error('Error al obtener el estudiantes por id', error)
    } finally {
      setLoading(false)
    }
  }
  // Obtener los estudiantes al cargar el contexto
  useEffect(() => {
    getEstudiantes()
  }, [])

  return (
    <EstudianteContexto.Provider
      value={{
        putEstudiante,
        getEstudianteById,
        getEstudianteByProfesor,
        postEstudiante,
        getEstudiantes,
        estudiantes,
        loading,
        error,
      }}
    >
      {children}
    </EstudianteContexto.Provider>
  )
}

export const useEstudiantes = () => {
  const context = useContext(EstudianteContexto)
  if (!context) {
    throw new Error(
      'useEstudiantes debe usarse dentro de un EstudiantesProvider'
    )
  }
  return context
}
