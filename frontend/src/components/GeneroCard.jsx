import { Link } from 'react-router-dom'

export default function GeneroCard({ genero }) {
  return (
    <Link
      to={`/catalogo?genero=${genero.id}`}
      className="card flex items-center gap-4 p-5 hover:scale-[1.02] transition-transform duration-200"
    >
      <div className="w-12 h-12 bg-violet-900/50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">??</div>
      <div>
        <h3 className="text-white font-semibold">{genero.nombre}</h3>
        {genero.descripcion && <p className="text-gray-500 text-sm mt-0.5 line-clamp-1">{genero.descripcion}</p>}
      </div>
    </Link>
  )
}
