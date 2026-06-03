import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-4">&#127916;</div>
      <h1 className="text-9xl font-black text-violet-900">404</h1>
      <h2 className="text-3xl font-bold text-white mt-2 mb-2">Pagina no encontrada</h2>
      <p className="text-gray-500 mb-8">Esta escena no existe.</p>
      <Link to="/" className="btn-primary px-8 py-3">Ir al inicio</Link>
    </div>
  )
}