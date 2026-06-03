import { Link, useNavigate } from "react-router-dom"
import { useCarrito } from "../context/CarritoContext"
import { logoutUser } from "../services/api"
import { MdMovie, MdShoppingCart, MdSettings, MdLogout, MdPerson } from "react-icons/md"

export default function Navbar() {
  const navigate = useNavigate()
  const { items: carrito } = useCarrito()
  const user = JSON.parse(localStorage.getItem("user") || "null")
  const cartCount = carrito.reduce((s, i) => s + (i.cantidad || 1), 0)

  const handleLogout = async () => {
    try { await logoutUser() } catch {}
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <nav className="bg-gray-900/80 backdrop-blur border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <MdMovie size={28} className="text-violet-500" />
          <span className="text-violet-400">CINE</span>
          <span className="text-white">STORE</span>
        </Link>
        <div className="hidden sm:flex items-center gap-6 text-sm text-gray-300">
          <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
          <Link to="/catalogo" className="hover:text-white transition-colors">Catalogo</Link>
          {user && <Link to="/mis-pedidos" className="hover:text-white transition-colors">Mis Pedidos</Link>}
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/carrito" className="relative text-gray-300 hover:text-white transition-colors">
                <MdShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-violet-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
              <span className="text-gray-400 text-sm hidden sm:block">Hola, {user.username}</span>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors">
                <MdLogout size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary px-4 py-1.5 text-sm flex items-center gap-1">
              <MdPerson size={18}/> Ingresar
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}