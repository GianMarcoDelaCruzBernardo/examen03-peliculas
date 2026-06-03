import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { getMisPedidos } from '../services/api'
import Loader     from '../components/Loader'
import EmptyState from '../components/EmptyState'
import { MdCheckCircle, MdMovie, MdArrowForward } from 'react-icons/md'

const ESTADO_COLORS = {
  pendiente:  'bg-yellow-900 text-yellow-300',
  confirmado: 'bg-green-900  text-green-300',
  cancelado:  'bg-red-900    text-red-300',
}

export default function MisPedidos() {
  const location = useLocation()
  const emailInicial = location.state?.email || ''
  const exito        = location.state?.exito  || false
  const [email,    setEmail]    = useState(emailInicial)
  const [pedidos,  setPedidos]  = useState([])
  const [loading,  setLoading]  = useState(false)
  const [buscado,  setBuscado]  = useState(false)

  useEffect(() => {
    if (emailInicial) buscar(emailInicial)
  }, [])

  const buscar = async (em = email) => {
    if (!em) return
    setLoading(true)
    setBuscado(false)
    try {
      const res = await getMisPedidos(em)
      const data = res.data.results || res.data
      setPedidos(data.filter(p => p.email_cliente === em))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setBuscado(true)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-2">Mis Pedidos</h1>
      <p className="text-gray-500 mb-8">Ingresa tu correo para ver el estado de tus pedidos.</p>

      {exito && (
        <div className="bg-green-900/40 border border-green-700 text-green-300 rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
          <MdCheckCircle size={20} />
          Pedido registrado exitosamente! Puedes ver el estado aqui.
        </div>
      )}

      <div className="flex gap-3 mb-8">
        <input
          type="email" placeholder="tu@correo.com"
          value={email} onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && buscar()}
          className="input-field flex-1"
        />
        <button onClick={() => buscar()} className="btn-primary px-6">Buscar</button>
      </div>

      {loading ? <Loader /> : buscado && pedidos.length === 0 ? (
        <EmptyState mensaje="No se encontraron pedidos con ese correo." />
      ) : pedidos.length > 0 ? (
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">{pedidos.length} pedido(s) encontrado(s)</p>
          {pedidos.map(p => (
            <div key={p.id} className="card p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <MdMovie size={18} className="text-violet-400" /> {p.pelicula_titulo}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Pedido #{p.id} &bull; {new Date(p.fecha).toLocaleDateString('es-PE')}
                  </p>
                  <p className="text-gray-500 text-sm">Cantidad: {p.cantidad}</p>
                </div>
                <div className="text-right">
                  <span className={`badge ${ESTADO_COLORS[p.estado] || 'bg-gray-800 text-gray-400'} mb-2`}>
                    {p.estado}
                  </span>
                  <p className="text-violet-400 font-bold text-xl">S/ {parseFloat(p.total).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-8">
        <Link to="/catalogo" className="text-violet-400 hover:underline text-sm flex items-center gap-1 w-fit">
          <MdArrowForward size={16} /> Seguir explorando
        </Link>
      </div>
    </div>
  )
}