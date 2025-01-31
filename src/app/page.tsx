import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Sistema de Gestión de Tareas
        </h1>
        <p className="text-gray-600">
          Gestiona tus tareas de manera eficiente
        </p>
        <div className="space-x-4">
          <Link 
            href="/login" 
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Empezar
          </Link>
        </div>
      </div>
    </main>
  );
}