import { z } from 'zod'
import { authZodSchema, loginZodSchema } from '@/zodEsquema/zodform'
import {
  LoginResponse,
  ProfesorLogin,
  RegistroResponse,
  TokenResponse,
} from '@/interfaces/Auth'
import {
  Nota,
  NotaActualizada,
  NotaResponseId,
  NotasForm,
  NotasIdState,
} from '@/interfaces/notas'

// Tipo para el contexto de autenticación
export type AuthContextType = {
  isAuthenticated: boolean
  registroUp: (datos: AuthFormValues) => Promise<void>
  userRegistro: RegistroResponse | undefined // Usar el tipo RegistroResponse
  userLogin: LoginResponse | undefined // Usar el tipo LoginResponse
  logout: () => void
  iniciarIn: (datos: ProfesorLogin) => Promise<void>
  error: string | null
  userExistente: TokenResponse | undefined
  cargando: boolean | null
}
export type NotasContextType = {
  notas: Nota[]
  loading: boolean
  updateNotas: (id: string, datos: NotasForm) => Promise<void>
  notasActualizar: NotaActualizada | undefined
  notasID: NotasIdState | undefined
  error: string | null
  obtenerNotas: () => Promise<void>
  obtenerNotasId: (id: string) => Promise<NotaResponseId>
}
// Tipos para los formularios
export type LoginFormInputs = z.infer<typeof loginZodSchema>
export type AuthFormValues = z.infer<typeof authZodSchema>
