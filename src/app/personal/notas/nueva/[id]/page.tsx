import FormCrearNota from '@/components/FormCrearNota'
import React from 'react'

interface EditNotasProps {
  params: Promise<{ id: string }> // params es una promesa
}

const EditInvoice: React.FC<EditNotasProps> = async ({ params }) => {
  // Desenvolver la promesa params usando React.use()
  const camino = await params
  const id = camino.id
  // Accede al ID de la ruta dinámica
  console.log('ID de la nota:', id)

  return (
    <div>
      <FormCrearNota id={id} />
    </div>
  )
}

export default EditInvoice
