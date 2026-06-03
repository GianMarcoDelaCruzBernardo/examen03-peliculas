import { useEffect } from 'react'

export default function AdminRedirect() {
  useEffect(() => { window.location.href = 'http://localhost:8000/admin/' }, [])
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-400">
      <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p>Redirigiendo al panel de administración...</p>
    </div>
  )
}
