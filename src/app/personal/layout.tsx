import AsideNav from '@/components/NavAside'
import ProtectedRoute from '@/components/ProtectedPages'
import { NotasProvider } from '@/context/notasContext'
import { Metadata } from 'next'
import React, { FC, PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Panel de control - Don Joe',
}

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ProtectedRoute>
      <NotasProvider>
        <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
          <aside className='w-full flex-none md:w-64 bg-slate-700'>
            <AsideNav />
          </aside>
          <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>
            {children}
          </div>
        </div>
      </NotasProvider>
    </ProtectedRoute>
  )
}

export default DashboardLayout
