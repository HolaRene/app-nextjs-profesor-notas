export interface GetEstudiante {
  _id: string
  nombre: string
  apellido: string
  edad: number
  sexo: string
  grado: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface NotasResponse {
  data: GetEstudiante[]
}
