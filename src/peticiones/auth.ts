import api from '@/axios/axios'
import {
  LoginResponse,
  ProfesorLogin,
  ProfesorRegistro,
  RegistroResponse,
  TokenResponse,
} from '@/interfaces/Auth'
import axios from 'axios'

const registro = async (datos: ProfesorRegistro): Promise<RegistroResponse> => {
  try {
    const response = await api.post<RegistroResponse>('/auth/registro', datos)
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

const login = async (datos: ProfesorLogin): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', datos)
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

const salir = async (): Promise<void> => {
  try {
    const response = await api.get('/auth/logout')
    console.log(response.data.message)

    // sessionStorage.removeItem('access_token'); // Si usas sessionStorage
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
    throw error
  }
}

export const verficarTokenRequest = async (
  token: string
): Promise<TokenResponse> => {
  try {
    const res = await api.get('/personal', {
      headers: {
        Authorization: `Bearer ${token}`, // Envía el token en el encabezado
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

export { registro, login, salir }
