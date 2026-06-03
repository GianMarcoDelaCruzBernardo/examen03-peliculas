import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../services/api"

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault(); setError(""); setLoading(true)
    try {
      const res = await loginUser(form)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesion.")
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md card p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">&#127916;</div>
          <h1 className="text-2xl font-bold text-white">Iniciar Sesion</h1>
          <p className="text-gray-500 mt-1">Bienvenido a CineStore</p>
        </div>
        {error && <div className="bg-red-900/40 border border-red-800 text-red-300 rounded-lg px-4 py-3 mb-6 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text"     placeholder="Usuario"    value={form.username} onChange={e => setForm({...form, username: e.target.value})} className="input-field" required />
          <input type="password" placeholder="Contrasena" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="input-field" required />
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? "Ingresando..." : "Ingresar"}</button>
        </form>
        <p className="text-center text-gray-500 mt-6 text-sm">
          &#191;No tienes cuenta? <Link to="/register" className="text-violet-400 hover:underline">Registrate</Link>
        </p>
      </div>
    </div>
  )
}