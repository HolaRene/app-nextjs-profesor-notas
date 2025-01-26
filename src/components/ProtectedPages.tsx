// components/ProtectedRoute.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Spinner from '@/components/Spinner' // Asegúrate de tener un componente Spinner
import { useAuth } from '@/context/authContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, cargando } = useAuth()
  const router = useRouter()

  console.log('cargando', cargando, 'autenticado:', isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated && !cargando) {
      router.push('/iniciar-sesion') // Redirige al login si no está autenticado y la verificación ha terminado
    }
  }, [isAuthenticated, cargando, router])

  // Muestra un spinner mientras se verifica la autenticación
  if (cargando) {
    return <Spinner />
  }

  // Si no está autenticado y la verificación ha terminado, no renderices nada (ya se redirigió)
  if (!isAuthenticated) {
    return null
  }

  // Si está autenticado, muestra el contenido protegido
  return <>{children}</>
}

export default ProtectedRoute
