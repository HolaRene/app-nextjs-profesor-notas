const ActividadesPersonal = () => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>
        Últimas Actividades
      </h2>
      <div className='space-y-4'>
        <div className='flex items-center space-x-4'>
          <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
            <span className='text-blue-600'>📝</span>
          </div>
          <div>
            <p className='text-gray-800'>Has actualizado tu perfil.</p>
            <p className='text-sm text-gray-500'>Hace 2 horas</p>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
            <span className='text-green-600'>🎓</span>
          </div>
          <div>
            <p className='text-gray-800'>
              Has revisado las notas de los estudiantes.
            </p>
            <p className='text-sm text-gray-500'>Hace 1 día</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ActividadesPersonal
