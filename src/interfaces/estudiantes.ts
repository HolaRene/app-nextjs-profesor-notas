export interface GetEstudiante {
  _id: string
  nombre: string
  apellido: string
  edad: number
  sexo: string
  grado: string
  description: string
  profesorId: string
  createdAt: string
  updatedAt: string
}

export interface EstudiantesResponse {
  message: string
  estudiantes: GetEstudiante[]
}
// Estudiante por Id
export interface EstudianteResponseById {
  message: string // Mensaje de la respuesta
  data: {
    nombre: string // Nombre del estudiante
    apellido: string // Apellido del estudiante
    grado: string // Grado del estudiante
    genero: string // Género del estudiante
    edad: number // Edad del estudiante
    profesorId: string
    description: string
  }
}
// Estudiante por Id Estado
export interface EstudianteResponseByIdState {
  nombre: string // Nombre del estudiante
  apellido: string // Apellido del estudiante
  grado: string // Grado del estudiante
  genero: string // Género del estudiante
  edad: number // Edad del estudiante
}
// Estudiante creado
export interface EstudianteCreadoResponse {
  message: string // Mensaje de la respuesta
  data: {
    nombre: string // Nombre del estudiante
    apellido: string // Apellido del estudiante
    grado: string // Grado del estudiante
    genero: string // Género del estudiante
    edad: number // Edad del estudiante
  }
}

// Estudiante actualizado
export interface EstudianteActualizadoResponse {
  message: string // Mensaje de la respuesta
  data: {
    _id: string // ID del estudiante
    nombre: string // Nombre del estudiante
    apellido: string // Apellido del estudiante
    edad: number // Edad del estudiante
    sexo: string // Sexo del estudiante
    grado: string // Grado del estudiante
    description: string // Descripción del estudiante
    createdAt: string // Fecha de creación en formato ISO
    updatedAt: string // Fecha de actualización en formato ISO
  }
}
// Estudiante actualizado Estado
export interface EstudianteActualizadoState {
  _id: string // ID del estudiante
  nombre: string // Nombre del estudiante
  apellido: string // Apellido del estudiante
  edad: number // Edad del estudiante
  sexo: string // Sexo del estudiante
  grado: string // Grado del estudiante
  description: string // Descripción del estudiante
  createdAt: string // Fecha de creación en formato ISO
  updatedAt: string // Fecha de actualización en formato ISO
}
//Formulario de estudiante
export interface EstudianteForm {
  nombre: string
  apellido: string
  edad: number
  grado: 'sexto' | 'cuarto' | 'quinto'
  description: string
  sexo: 'masculino' | 'femenino'
  profesorId: string
}
// Estudiantes por profesor
export interface EstudiantesPorProfesor {
  message: string
  estudiantes: GetEstudiante[]
}
