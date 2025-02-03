import { z } from 'zod'
import {
  authZodSchema,
  estudianteZodSchema,
  loginZodSchema,
} from '@/zodEsquema/zodform'
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
import {
  EstudianteActualizadoResponse,
  EstudianteCreadoResponse,
  EstudianteForm,
  EstudianteResponseById,
  EstudianteResponseByIdState,
  EstudiantesPorProfesor,
  EstudiantesResponse,
  GetEstudiante,
} from '@/interfaces/estudiantes'

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
// Tipo para el contexto de estudiantes
export type EstudiantesContextType = {
  estudiantes: GetEstudiante[] | undefined
  loading: boolean
  error: string | null
  getEstudiantes: () => Promise<void>
  getEstudianteById: (id: string) => Promise<EstudianteResponseById | undefined>
  putEstudiante: (
    id: string,
    datos: EstudianteForm
  ) => Promise<EstudianteActualizadoResponse | undefined>
  getEstudianteByProfesor: (profesorId: string | undefined) => Promise<void>
  postEstudiante: (datos: EstudianteFormInputs) => Promise<void>
}
// Tipos para los formularios
export type LoginFormInputs = z.infer<typeof loginZodSchema>
export type AuthFormValues = z.infer<typeof authZodSchema>
export type EstudianteFormInputs = z.infer<typeof estudianteZodSchema>
