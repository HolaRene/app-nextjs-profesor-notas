import api from '@/axios/axios'
import { ProfesorResponse } from '@/interfaces/Auth'
import axios from 'axios'

const profesorById = async (id: string): Promise<ProfesorResponse> => {
  try {
    const response = await api.get(`/profesores/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Extrae el mensaje de error del backend
      throw new Error(error.response.data.error)
    }
    // Error genérico si no es un error de Axios
    throw new Error('Error en el registro')
  }
}

export { profesorById }
