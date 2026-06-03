import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProducto } from '../services/api'
import { useCarrito } from '../context/CarritoContext'
import Loader from '../components/Loader'

const PH = 'https://placehold.co/600x500/1e293b/94a3b8?text=Sin+imagen'

export default function DetalleProducto() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [loading,  setLoading]  = useState(true)
  const { dispatch } = useCarrito()

  useEffect(() => {
    getProducto(id).then(r => setProducto(r.data)).catch(console.error).finally(() => setLoading(false))
  }, [id])

  if (loading)   return <Loader />
  if (!producto) return <div className="text-center py-20 text-gray-400">Producto no encontrado.</div>

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link to="/catalogo" className="inline-flex items-center gap-2 text-gray-400 hover:text-sky-400 mb-8 transition-colors">← Volver al catálogo</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden border border-gray-800 aspect-[4/3]">
          <img src={producto.imagen_url || producto.imagen || PH} alt={producto.nombre} className="w-full h-full object-cover" onError={e => { e.target.src = PH }} />
        </div>
        <div className="flex flex-col">
          {producto.categoria_nombre && (
            <span className="badge bg-sky-900 text-sky-400 w-fit mb-4">{producto.categoria_nombre}</span>
          )}
          <h1 className="text-3xl font-bold text-white mb-3">{producto.nombre}</h1>
          <p className="text-gray-400 leading-relaxed mb-6">{producto.descripcion || 'Sin descripción.'}</p>
          <span className={`text-sm mb-4 ${producto.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {producto.stock > 0 ? `${producto.stock} unidades disponibles` : 'Sin stock'}
          </span>
          <div className="text-4xl font-black text-sky-400 mb-6">S/ {parseFloat(producto.precio).toFixed(2)}</div>
          <button
            onClick={() => dispatch({ type: 'AGREGAR', producto })}
            disabled={producto.stock === 0}
            className="btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}
