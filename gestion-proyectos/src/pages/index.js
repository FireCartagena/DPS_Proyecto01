import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Gestión de Usuarios</h1>
        <div className="space-x-4">
          <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Iniciar Sesión
          </Link>
          <Link href="/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}