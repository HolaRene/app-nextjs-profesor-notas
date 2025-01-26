import { SlArrowRight } from 'react-icons/sl'

const Caracteristicas = () => {
  return (
    <section className=' py-16 bg-gray-800 text-white'>
      <div className='container mx-auto'>
        <h2 className='text-3xl font-bold text-center mb-10'>
          Características de Nuestra Plataforma
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='feature text-center p-6 bg-gray-700 rounded-lg'>
            <h3 className='text-xl font-semibold mb-4'>
              <SlArrowRight />
              Gestión de Estudiantes
            </h3>
            <p>
              Agrega, edita y organiza información de estudiantes de manera
              eficiente.
            </p>
          </div>
          <div className='feature text-center p-6 bg-gray-700 rounded-lg'>
            <h3 className='text-xl font-semibold mb-4'>
              <SlArrowRight />
              Asignación de Notas
            </h3>
            <p>
              Registra calificaciones de forma rápida y precisa, con opciones de
              revisión.
            </p>
          </div>
          <div className='feature text-center p-6 bg-gray-700 rounded-lg'>
            <h3 className='text-xl font-semibold mb-4'>
              <SlArrowRight />
              Acceso Seguro
            </h3>
            <p>
              Accede al sistema con autenticación segura para profesores y
              administradores.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Caracteristicas
