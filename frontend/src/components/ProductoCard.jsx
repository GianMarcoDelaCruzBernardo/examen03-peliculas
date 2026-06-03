import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

const PH = 'https://placehold.co/400x300/1e293b/94a3b8?text=Sin+imagen'

export default function ProductoCard({ producto }) {
  const { dispatch } = useCarrito()
  return (
    <div className="card group flex flex-col">
      <Link to={`/producto/${producto.id}`} className="relative overflow-hidden aspect-[4/3]">
        <img
          src={producto.imagen_url || producto.imagen || PH}
          alt={producto.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={e => { e.target.src = PH }}
        />
        {producto.stock === 0 && <span className="absolute top-3 left-3 badge bg-red-900 text-red-300">Sin stock</span>}
        {producto.categoria_nombre && <span className="absolute top-3 right-3 badge bg-sky-900 text-sky-300">{producto.categoria_nombre}</span>}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/producto/${producto.id}`}>
          <h3 className="text-white font-semibold text-lg hover:text-sky-400 transition-colors line-clamp-2">{producto.nombre}</h3>
        </Link>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2 flex-1">{producto.descripcion || 'Sin descripción.'}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-sky-400 font-bold text-xl">S/ {parseFloat(producto.precio).toFixed(2)}</span>
            <p className="text-gray-600 text-xs mt-0.5">Stock: {producto.stock}</p>
          </div>
          <button
            onClick={() => dispatch({ type: 'AGREGAR', producto })}
            disabled={producto.stock === 0}
            className="p-2 bg-sky-600 hover:bg-sky-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-colors text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 19a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
