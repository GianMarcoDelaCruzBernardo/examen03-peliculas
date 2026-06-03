import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

const PH = 'https://placehold.co/400x560/1e1b4b/a78bfa?text=Sin+imagen'

export default function PeliculaCard({ pelicula }) {
  const { dispatch } = useCarrito()
  return (
    <div className="card group flex flex-col">
      <Link to={`/pelicula/${pelicula.id}`} className="relative overflow-hidden aspect-[2/3]">
        <img
          src={pelicula.imagen_url || pelicula.imagen || PH}
          alt={pelicula.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { e.target.src = PH }}
        />
        {pelicula.genero_nombre && (
          <span className="absolute top-3 right-3 badge bg-violet-900 text-violet-300">{pelicula.genero_nombre}</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/pelicula/${pelicula.id}`}>
          <h3 className="text-white font-bold text-base hover:text-violet-400 transition-colors line-clamp-1">{pelicula.titulo}</h3>
        </Link>
        <p className="text-gray-500 text-sm mt-1">{pelicula.director} · {pelicula.anio}</p>

        <div className="mt-4 flex gap-2">
          <Link to={`/pelicula/${pelicula.id}`} className="flex-1 text-center btn-secondary text-sm py-2">Ver detalle</Link>
          <button
            onClick={() => dispatch({ type: 'AGREGAR', item: { ...pelicula, precio: 15 } })}
            className="flex-1 btn-primary text-sm py-2"
          >
            + Carrito
          </button>
        </div>
      </div>
    </div>
  )
}
