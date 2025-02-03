import api from '@/axios/axios'
import {
  EstudianteActualizadoResponse,
  EstudianteCreadoResponse,
  EstudianteForm,
  EstudianteResponseById,
  EstudiantesPorProfesor,
  EstudiantesResponse,
} from '@/interfaces/estudiantes'
import { EstudianteFormInputs } from '@/types/tipos'
import axios from 'axios'

export const obtenerEstudiantes = async (): Promise<EstudiantesResponse> => {
  try {
    const response = await api.get<EstudiantesResponse>('/estudiantes')
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

export const obtenerEstudiantePorId = async (
  id: string
): Promise<EstudianteResponseById> => {
  try {
    const response = await api.get(`/estudiantes/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Extrae el mensaje de error del backend
      throw new Error(error.response.data.error)
    }
    // Error genérico si no es un error de Axios
    throw new Error('Error al obtener las notas')
  }
}

export const crearEstudiante = async (
  estudiante: EstudianteFormInputs
): Promise<EstudianteCreadoResponse> => {
  try {
    const response = await api.post<EstudianteCreadoResponse>(
      '/estudiantes',
      estudiante
    )
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

export const obtenerEstudiantePorProfesor = async (
  profesorId: string | undefined
): Promise<EstudiantesPorProfesor> => {
  try {
    const res = await api.get('/personal/estudiantes', {
      headers: {
        Authorization: `Bearer ${profesorId}`, // Envía el token en el encabezado
      },
    })
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Extrae el mensaje de error del backend
      throw new Error(error.response.data.error)
    }
    // Error genérico si no es un error de Axios
    throw new Error('Error al verificar el token')
  }
}
export const actualizarEstudiante = async (
  id: string,
  datos: EstudianteForm
): Promise<EstudianteActualizadoResponse> => {
  try {
    const response = await api.put(`/estudiantes/${id}`, datos)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Extrae el mensaje de error del backend
      throw new Error(error.response.data.error)
    }
    // Error genérico si no es un error de Axios
    throw new Error('Error al obtener las notas')
  }
}
