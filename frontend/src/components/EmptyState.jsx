export default function EmptyState({ mensaje = "No hay elementos." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      <div className="text-6xl mb-4">&#127916;</div>
      <p className="text-lg">{mensaje}</p>
    </div>
  )
}