import { z } from 'zod'

export const authZodSchema = z.object({
  nombre: z
    .string({
      message: 'El nombre es requerido',
    })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(30, { message: 'El nombre no debe exceder los 30 caracteres' }),
  codigo: z.string({
    required_error: 'El código es requerido',
  }),
  apellido: z
    .string({
      message: 'El apellido es requerido',
    })
    .min(3, { message: 'El apellido debe tener al menos 3 caracteres' })
    .max(30, { message: 'El apellido no debe exceder los 30 caracteres' }),
  grado: z.enum(['sexto', 'cuarto', 'quinto'], {
    message: 'El grado es requerido. Debe ser sexto, cuarto o quinto',
  }),
  materias: z
    .array(
      z.enum(['Ciencias', 'Historia', 'Matemáticas'], {
        message:
          'Cada materia debe ser válida (Ciencias, Historia o Matemáticas).',
      })
    )
    .nonempty({
      message: 'Debes incluir al menos una materia.',
    }),
  correo: z
    .string({
      required_error: 'El correo es requerido',
    })
    .email({ message: 'El correo no es válido' }),
  password: z
    .string({
      required_error: 'La contraseña es requerida',
    })
    .min(5, { message: 'La contraseña debe tener al menos 5 caracteres' })
    .max(100, { message: 'La contraseña no debe exceder los 100 caracteres' }),
})

// Define el esquema de validación
export const loginZodSchema = z.object({
  correo: z
    .string({
      required_error: 'El correo es requerido',
    })
    .min(6, { message: 'El correo debe tener al menos 6 caracteres' })
    .max(40, { message: 'El correo no debe exceder los 40 caracteres' })
    .email({ message: 'El correo no es válido' }),
  password: z
    .string({
      required_error: 'La contraseña es requerida',
    })
    .min(5, { message: 'La contraseña debe tener al menos 5 caracteres' })
    .max(30, { message: 'La contraseña no debe exceder los 30 caracteres' }),
})
// Esquema de validación con Zod
export const profileSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  correo: z.string().email('Ingresa un correo válido'),
})

export const notasZodSchema = z.object({
  estudiante: z.string({ required_error: 'El estudiante es requerido' }),
  materia: z.enum(['Matemáticas', 'Ciencias', 'Historia'], {
    required_error: 'La materia es requerida',
    invalid_type_error: 'La materia debe ser Matemáticas, Ciencias o Historia',
  }),
  calificacion: z
    .number({
      required_error: 'La calificación es requerida',
      invalid_type_error: 'La calificación debe ser un número',
    })
    .min(0, { message: 'La calificación mínima es 0' })
    .max(100, { message: 'La calificación máxima es 100' }),
  profesor: z.string().optional(), // El profesor es opcional
})
