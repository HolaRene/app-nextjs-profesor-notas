export interface Estudiante {
  _id: string
  nombre: string
}

export interface Profesor {
  _id: string
  nombre: string
}

export interface Nota {
  _id: string
  estudiante: Estudiante
  materia: string
  calificacion: number
  profesor: Profesor
  createdAt: string
  updatedAt: string
}

export interface NotasResponse {
  message: string
  data: Nota[]
}
// interface de la respuesta de la nota por id
export interface NotaPorId {
  _id: string
  estudiante: {
    _id: string
    nombre: string
  }
  materia: string
  calificacion: number
  profesor: {
    _id: string
    nombre: string
  }
  createdAt: string
  updatedAt: string
}

export interface NotasIdState {
  nota: NotaPorId
}

export interface NotaResponseId {
  message: string
  data: {
    nota: NotaPorId
  }
}
// Interface de actualizar NotaResponse
export interface NotaActualizada {
  _id: string
  estudiante: string
  materia: string
  calificacion: number
  profesor?: string
  createdAt: string
  updatedAt: string
}

export interface NotaResponseUpdate {
  message: string
  data: {
    updNota: NotaActualizada
  }
}
// Interface para el formulario de notas
export interface NotasForm {
  estudiante: string // ID del estudiante
  materia: 'Matemáticas' | 'Ciencias' | 'Historia' // Materias permitidas
  calificacion: number // Calificación del estudiante (0-100)
  profesor?: string // ID del profesor (opcional)
}
