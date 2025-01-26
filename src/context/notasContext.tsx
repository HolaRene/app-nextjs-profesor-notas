'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import {
  actualizarEstudianteNota,
  obtenerEstudianteNotaID,
  obtenerEstudiantesNotas,
} from '@/peticiones/notas' // Asegúrate de importar las interfaces correctas
import {
  Nota,
  NotaActualizada,
  NotaResponseId,
  NotasForm,
  NotasIdState,
} from '@/interfaces/notas'
import { NotasContextType } from '@/types/tipos'

const NotasContexto = createContext<NotasContextType | undefined>(undefined)

export const NotasProvider = ({ children }: { children: ReactNode }) => {
  const [notas, setNotas] = useState<Nota[]>([])
  const [notasActualizar, setNotasActualizar] = useState<NotaActualizada>()
  const [notasID, setNotasId] = useState<NotasIdState>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Función para obtener las notas
  const obtenerNotas = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await obtenerEstudiantesNotas()
      setNotas(response.data) // Actualiza el estado con las notas
    } catch (error) {
      setError('Error al obtener las notas')
      console.error('Error al obtener las notas:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateNotas = async (id: string, notas: NotasForm) => {
    try {
      setLoading(true)
      setError(null)
      const response = await actualizarEstudianteNota(id, notas)
      setNotasActualizar(response.data.updNota)
    } catch (error) {
      if (error instanceof Error) {
        // Si el error es una instancia de Error, extrae el mensaje
        setError(error.message)
      } else {
        // Si no es una instancia de Error, muestra un mensaje genérico
        setError('Error en el registro')
      }
      console.error('Error en el registro:', error)
    }
  }
  //Obtener notas y datos
  const obtenerNotasId = async (id: string): Promise<NotaResponseId> => {
    try {
      setLoading(true)
      setError(null)
      const response = await obtenerEstudianteNotaID(id)
      setNotasId(response.data) // Actualiza el estado con los datos de la nota
      return response // Devuelve los datos para usarlos en el componente
    } catch (error) {
      setError('Error al obtener las notas')
      console.error('Error al obtener las notas:', error)
      throw error // Lanza el error para manejarlo en el componente
    } finally {
      setLoading(false)
    }
  }
  // Obtener las notas al cargar el contexto
  useEffect(() => {
    obtenerNotas()
  }, [])

  return (
    <NotasContexto.Provider
      value={{
        notasID,
        notas,
        loading,
        updateNotas,
        error,
        obtenerNotas,
        notasActualizar,
        obtenerNotasId,
      }}
    >
      {children}
    </NotasContexto.Provider>
  )
}

export const useNotas = () => {
  const context = useContext(NotasContexto)
  if (!context) {
    throw new Error('useNotas debe usarse dentro de un NotasProvider')
  }
  return context
}
