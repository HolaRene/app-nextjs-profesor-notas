import type { Metadata } from 'next'
import './globals.css'
import Navegacion from '@/components/Navegacion'
import { AuthProvider } from '@/context/authContext'

export const metadata: Metadata = {
  title: 'Inicio - Don Joe',
  description: 'Este es la página de inicio de Don Joe',
  keywords: ['don joe', 'don john', 'don jose', 'don john doe'],
  icons: {
    icon: '/donjoe.png', // Usa una URL relativa al directorio /public
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className='bg-gray-800 text-white'>
        <AuthProvider>
          {' '}
          {/* Envuelve con el AuthProvider */}
          <Navegacion />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
