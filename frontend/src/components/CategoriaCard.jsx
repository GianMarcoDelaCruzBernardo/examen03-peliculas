import { Link } from 'react-router-dom'

export default function CategoriaCard({ categoria }) {
  return (
    <Link to={`/catalogo?categoria=${categoria.id}`} className="card flex items-center gap-4 p-5 hover:scale-[1.02] transition-transform duration-200">
      <div className="w-12 h-12 bg-sky-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      </div>
      <div>
        <h3 className="text-white font-semibold">{categoria.nombre}</h3>
        {categoria.descripcion && <p className="text-gray-500 text-sm mt-0.5 line-clamp-1">{categoria.descripcion}</p>}
      </div>
    </Link>
  )
}
