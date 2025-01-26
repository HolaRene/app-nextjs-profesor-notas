'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { useRouter } from 'next/navigation'
import { AuthContextType, AuthFormValues } from '@/types/tipos'
import { login, registro, salir, verficarTokenRequest } from '@/peticiones/auth'
import Cookies from 'js-cookie'
import {
  LoginResponse,
  ProfesorLogin,
  RegistroResponse,
  TokenResponse,
} from '@/interfaces/Auth'

// Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRegistro, setUserRegistro] = useState<
    RegistroResponse | undefined
  >(undefined) // Usar el tipo RegistroResponse
  const [userLogin, setUserLogin] = useState<LoginResponse | undefined>(
    undefined
  ) // Usar el tipo RegistroResponse
  const [userExistente, setUserExistente] = useState<TokenResponse | undefined>(
    undefined
  ) // Usar el tipo RegistroResponse
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState<boolean | null>(true)

  const router = useRouter()

  // Función para registrar un usuario
  const registroUp = async (datos: AuthFormValues) => {
    try {
      const fetchRegistro = await registro(datos) // Llama a la función de registro
      setUserRegistro(fetchRegistro) // Guarda los datos del usuario
      setIsAuthenticated(true) // Establece el estado de autenticación
      setError(null) // Limpia cualquier error previo
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

  const iniciarIn = async (datos: ProfesorLogin) => {
    try {
      const response = await login(datos)
      console.log(response)
      setIsAuthenticated(true)
      setUserLogin(response)
      // Redirigir al usuario a /personal después de un inicio de sesión exitoso
      router.push('/personal')
      setError(null)
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

  // Borrar los errores
  useEffect(() => {
    if (error && error.length > 0) {
      // Verifica que error no sea null
      const timeout = setTimeout(() => {
        setError(null) // Limpia el error después de 5 segundos
      }, 5000) // 5000 milisegundos = 5 segundos

      return () => clearTimeout(timeout) // Limpia el timeout si el componente se desmonta
    }
  }, [error])

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get()
      if (!cookies.access_token) {
        setIsAuthenticated(false)
        setUserExistente(undefined)
        setUserLogin(undefined)
        setUserRegistro(undefined)
        setCargando(false) // Verificación terminada
        return
      }

      try {
        const res = await verficarTokenRequest(cookies.access_token)
        if (!res) {
          setIsAuthenticated(false)
          setUserRegistro(undefined)
          setUserLogin(undefined)
          setUserExistente(undefined)
          setCargando(false) // Verificación terminada
          return
        }
        setUserExistente(res)
        setIsAuthenticated(true)
        setCargando(false) // Verificación terminada
      } catch (error) {
        console.error('Error al verificar token:', error)
        setIsAuthenticated(false)
        setUserLogin(undefined)
        setUserExistente(undefined)
        setUserRegistro(undefined)
        setCargando(false) // Verificación terminada
      }
    }

    setCargando(true) // Inicia la verificación
    checkLogin()
  }, [])

  // Función para cerrar sesión
  const logout = async () => {
    await salir()
    setIsAuthenticated(false)
    setUserRegistro(undefined) // Limpia los datos del usuario
    setUserLogin(undefined) // Limpia los datos del usuario
    setUserExistente(undefined) // Limpia los datos del ususaior existente
    router.push('/login') // Redirige al usuario al login después del logout
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        registroUp,
        userLogin,
        userRegistro,
        iniciarIn,
        logout,
        error,
        userExistente,
        cargando,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
