import api from '@/axios/axios'
import {
  NotaResponseId,
  NotaResponseUpdate,
  NotasForm,
  NotasResponse,
} from '@/interfaces/notas'
import axios from 'axios'

const obtenerEstudiantesNotas = async (): Promise<NotasResponse> => {
  try {
    const response = await api.get<NotasResponse>('/notas')
    return response.data // Devuelve la respuesta del backend
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Extrae el mensaje de error del backend
      throw new Error(error.response.data.error)
    }
    // Error genérico si no es un error de Axios
    throw new Error('Error al obtener las notas')
  }
}
const obtenerEstudianteNotaID = async (id: string): Promise<NotaResponseId> => {
  try {
    const response = await api.get<NotaResponseId>(`/notas/${id}`)
    return response.data // Devuelve la respuesta del backend
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Extrae el mensaje de error del backend
      throw new Error(error.response.data.error)
    }
    // Error genérico si no es un error de Axios
    throw new Error('Error al obtener las notas')
  }
}
const actualizarEstudianteNota = async (
  id: string,
  datos: NotasForm
): Promise<NotaResponseUpdate> => {
  try {
    const response = await api.put<NotaResponseUpdate>(`/notas/${id}`, datos)
    return response.data // Devuelve la respuesta del backend
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Extrae el mensaje de error del backend
      throw new Error(error.response.data.error)
    }
    // Error genérico si no es un error de Axios
    throw new Error('Error al obtener las notas')
  }
}
export {
  obtenerEstudiantesNotas,
  obtenerEstudianteNotaID,
  actualizarEstudianteNota,
}
