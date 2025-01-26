import Link from 'next/link'

const Header = () => {
  return (
    <section className='hero bg-gray-900 text-white py-20'>
      <div className='container mx-auto text-center'>
        <h1 className='text-4xl font-bold mb-4'>¡Bienvenido a Don Joe!</h1>
        <p className='text-lg mb-6'>
          Gestión eficiente de estudiantes y calificaciones en un solo lugar.
        </p>
        <Link
          href='/registro'
          className='btn bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600'
        >
          Empezar Ahora
        </Link>
      </div>
    </section>
  )
}
export default Header
