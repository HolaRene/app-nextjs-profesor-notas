import FormEditEstudiante from '@/components/FormEdithEstudiantes'
import React from 'react'

interface EditEstudiantesProps {
  params: Promise<{ id: string }> // params es una promesa
}

const EditInvoice: React.FC<EditEstudiantesProps> = async ({ params }) => {
  // Desenvolver la promesa params usando React.use()
  const camino = await params
  const id = camino.id
  // Accede al ID de la ruta dinámica
  console.log('ID de la nota:', id)

  return (
    <div>
      <FormEditEstudiante id={id} />
    </div>
  )
}

export default EditInvoice
