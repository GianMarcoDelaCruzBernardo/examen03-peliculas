import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { crearPedido } from '../services/api'
import EmptyState from '../components/EmptyState'

const PH = 'https://placehold.co/80x80/1e1b4b/a78bfa?text=?'

export default function Carrito() {
  const { items, dispatch, total } = useCarrito()
  const navigate = useNavigate()
  const [nombre,   setNombre]   = useState('')
  const [email,    setEmail]    = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error,    setError]    = useState('')

  if (items.length === 0) return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Carrito</h1>
      <EmptyState mensaje="Tu carrito esta vacio." />
      <div className="text-center mt-6"><Link to="/catalogo" className="btn-primary inline-block">Ir al catalogo</Link></div>
    </div>
  )

  const handlePedido = async () => {
    if (!nombre.trim() || !email.trim()) { setError('Completa tu nombre y correo.'); return }
    if (!email.includes('@'))             { setError('Correo no v�lido.'); return }
    setError('')
    setEnviando(true)
    try {
      for (const item of items) {
        await crearPedido({
          nombre_cliente: nombre,
          email_cliente:  email,
          pelicula:       item.id,
          cantidad:       item.cantidad,
          total:          (parseFloat(item.precio || 15) * item.cantidad).toFixed(2),
          notas:          `Pedido desde el frontend`,
        })
      }
      dispatch({ type: 'VACIAR' })
      navigate('/mis-pedidos', { state: { exito: true, email } })
    } catch (err) {
      setError('Error al registrar el pedido. Intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Carrito</h1>
        <button onClick={() => dispatch({ type: 'VACIAR' })} className="btn-danger text-sm">Vaciar</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="card flex items-center gap-4 p-4">
              <img
                src={item.imagen_url || item.imagen || PH}
                alt={item.titulo}
                className="w-16 h-20 object-cover rounded-xl flex-shrink-0"
                onError={e => { e.target.src = PH }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold truncate">{item.titulo}</h3>
                <p className="text-gray-500 text-sm">{item.director}  {item.año}</p>
                <p className="text-violet-400 font-bold mt-1">S/ {parseFloat(item.precio || 15).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => dispatch({ type: 'REDUCIR',     id: item.id })} className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-white">-</button>
                <span className="w-6 text-center font-bold text-white">{item.cantidad}</span>
                <button onClick={() => dispatch({ type: 'INCREMENTAR', id: item.id })} className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-white">+</button>
              </div>
              <p className="text-white font-bold w-20 text-right">S/ {(parseFloat(item.precio || 15) * item.cantidad).toFixed(2)}</p>
              <button onClick={() => dispatch({ type: 'ELIMINAR', id: item.id })} className="text-gray-500 hover:text-red-400 text-xl ml-2">?</button>
            </div>
          ))}
        </div>

        {/* Resumen + Formulario */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-fit space-y-4">
          <h2 className="text-xl font-bold text-white">Confirmar Pedido</h2>

          {error && <div className="bg-red-900/40 border border-red-800 text-red-300 rounded-lg px-3 py-2 text-sm">{error}</div>}

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Nombre completo</label>
            <input
              type="text" placeholder="Tu nombre"
              value={nombre} onChange={e => setNombre(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Correo electronico</label>
            <input
              type="email" placeholder="tu@correo.com"
              value={email} onChange={e => setEmail(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="border-t border-gray-800 pt-4">
            <div className="flex justify-between text-white font-bold text-lg mb-4">
              <span>Total</span>
              <span className="text-violet-400">S/ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePedido}
              disabled={enviando}
              className="btn-primary w-full py-4 text-lg disabled:opacity-50"
            >
              {enviando ? 'Registrando...' : '? Confirmar Pedido'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
