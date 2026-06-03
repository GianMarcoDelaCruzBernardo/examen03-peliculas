import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../services/api"

export default function Register() {
  const navigate = useNavigate()
  const [form,    setForm]    = useState({ username: "", email: "", password: "" })
  const [error,   setError]   = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault(); setError("")
    if (form.password.length < 6) { setError("La contrasena debe tener al menos 6 caracteres."); return }
    setLoading(true)
    try {
      await registerUser(form)
      setSuccess("Cuenta creada! Redirigiendo...")
      setTimeout(() => navigate("/login"), 1500)
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrarse.")
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md card p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">&#127917;</div>
          <h1 className="text-2xl font-bold text-white">Crear Cuenta</h1>
          <p className="text-gray-500 mt-1">Unete a CineStore</p>
        </div>
        {error   && <div className="bg-red-900/40   border border-red-800   text-red-300   rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>}
        {success && <div className="bg-green-900/40 border border-green-800 text-green-300 rounded-lg px-4 py-3 mb-4 text-sm">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text"     placeholder="Nombre de usuario"            value={form.username} onChange={e => setForm({...form, username: e.target.value})} className="input-field" required />
          <input type="email"    placeholder="Correo electronico"           value={form.email}    onChange={e => setForm({...form, email: e.target.value})}    className="input-field" required />
          <input type="password" placeholder="Contrasena (min. 6 caracteres)" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="input-field" required />
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? "Registrando..." : "Registrarse"}</button>
        </form>
        <p className="text-center text-gray-500 mt-6 text-sm">
          &#191;Ya tienes cuenta? <Link to="/login" className="text-violet-400 hover:underline">Iniciar sesion</Link>
        </p>
      </div>
    </div>
  )
}