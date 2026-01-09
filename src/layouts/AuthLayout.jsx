import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Agar xohlasangiz bu yerga logotip, "Back to home" tugmasi qo'yishingiz mumkin */}
      
      <main className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Footer qo'ymaymiz yoki juda sodda qilamiz */}
    </div>
  )
}