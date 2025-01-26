import api from '@/axios/axios'
import { Estudiante } from '@/interfaces/estudiantes'

export const obtenerEstudiantes = async (): Promise<{ data: Estudiante[] }> => {
  const response = await api.get('/estudiantes')
  return response.data
}

export const obtenerEstudiantePorId = async (
  id: string
): Promise<Estudiante> => {
  const response = await api.get(`/estudiantes/${id}`)
  return response.data
}

export const crearEstudiante = async (
  estudiante: Estudiante
): Promise<Estudiante> => {
  const response = await api.post('/estudiantes', estudiante)
  return response.data
}
