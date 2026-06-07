import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPelicula } from '../services/api'
import { useCarrito } from '../context/CarritoContext'
import Loader from '../components/Loader'
import { MdArrowBack, MdPerson, MdCalendarToday, MdShoppingCart } from 'react-icons/md'

const PH = 'https://placehold.co/500x700/1e1b4b/a78bfa?text=Sin+imagen'

export default function DetallePelicula() {
  const { id } = useParams()
  const [pelicula, setPelicula] = useState(null)
  const [loading,  setLoading]  = useState(true)
  const { dispatch } = useCarrito()

  useEffect(() => {
    getPelicula(id).then(r => setPelicula(r.data)).catch(console.error).finally(() => setLoading(false))
  }, [id])

  if (loading)   return <Loader />
  if (!pelicula) return <div className="text-center py-20 text-gray-400">Pelicula no encontrada.</div>

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link to="/catalogo" className="text-gray-400 hover:text-violet-400 mb-8 inline-flex items-center gap-1 transition-colors">
        <MdArrowBack size={18} /> Volver al catalogo
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden border border-gray-800 aspect-[2/3]">
          <img
            src={pelicula.imagen_url || PH}
            alt={pelicula.titulo}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = PH }}
          />
        </div>
        <div className="flex flex-col justify-center">
          {pelicula.genero_nombre && (
            <span className="badge bg-violet-900 text-violet-400 w-fit mb-4">{pelicula.genero_nombre}</span>
          )}
          <h1 className="text-4xl font-black text-white mb-2">{pelicula.titulo}</h1>
          <p className="text-gray-400 text-lg mb-1 flex items-center gap-2">
            <MdPerson size={18} /> {pelicula.director}
          </p>
          <p className="text-gray-500 mb-6 flex items-center gap-2">
            <MdCalendarToday size={16} /> {pelicula.anio}
          </p>
          <div className="text-3xl font-black text-violet-400 mb-8">
            S/ {pelicula.precio || '15.00'}
          </div>
          <button
            onClick={() => dispatch({ type: 'AGREGAR', item: { ...pelicula, precio: pelicula.precio || 15 } })}
            className="btn-primary py-4 text-lg flex items-center justify-center gap-2"
          >
            <MdShoppingCart size={22} /> Agregar al carrito
          </button>
          <Link to="/carrito" className="btn-secondary py-4 text-lg text-center mt-3">Ver carrito</Link>
        </div>
      </div>
    </div>
  )
}