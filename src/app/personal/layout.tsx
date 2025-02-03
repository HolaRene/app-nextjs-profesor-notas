import AsideNav from '@/components/NavAside'
import ProtectedRoute from '@/components/ProtectedPages'
import { EstudiantesProvider } from '@/context/estudiantesContext'
import { NotasProvider } from '@/context/notasContext'
import { Metadata } from 'next'
import React, { FC, PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Panel de control - Don Joe',
}

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ProtectedRoute>
      <EstudiantesProvider>
        <NotasProvider>
          <div className='flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-100'>
            {/* Sidebar */}
            <aside className='w-full flex-none md:w-64 bg-slate-800 shadow-lg'>
              <AsideNav />
            </aside>

            {/* Main Content */}
            <div className='flex-grow p-6 overflow-y-auto md:p-8 bg-gray-100'>
              {children}
            </div>
          </div>
        </NotasProvider>
      </EstudiantesProvider>
    </ProtectedRoute>
  )
}

export default DashboardLayout
