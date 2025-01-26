export interface ProfesorRegistro {
  nombre: string
  apellido: string
  codigo: string
  grado: 'cuarto' | 'quinto' | 'sexto'
  password: string
  correo: string
  materias: ('Matemáticas' | 'Ciencias' | 'Historia')[]
}

export interface ProfesorLogin {
  correo: string
  password: string
}

export interface LoginResponse {
  login: {
    user: string
    apellido: string
    correo: string
    grado: 'cuarto' | 'quinto' | 'sexto'
    materias: ('Matemáticas' | 'Ciencias' | 'Historia')[]
    token: string
  }
}
export interface TokenResponse {
  mensaje: string
  datos: {
    correo: string
    id: string
  }
}
// interface de profesor buscado por el id
export interface ProfesorResponse {
  _id: string
  nombre: string
  materias: ('Matemáticas' | 'Ciencias' | 'Historia')[]
  grado: string
  codigo: string
  apellido: string
  correo: string
  password: string
  createdAt: string
  updatedAt: string
}
export interface RegistroResponse {
  nombre: string
  materias: ('Matemáticas' | 'Ciencias' | 'Historia')[]
  grado: 'cuarto' | 'quinto' | 'sexto'
  codigo: string
  apellido: string
  correo: string
  password: string
  _id: string
  createdAt: string
  updatedAt: string
}
