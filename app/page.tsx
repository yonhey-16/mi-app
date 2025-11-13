import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Miniapps</h1>

      <div className="grid gap-6">
        <Link href="/miniapps/corazon" className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700">
          ❤️ Corazón animado
        </Link>

        <Link href="/miniapps/segunda" className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
          🎮  Rompecabezas
        </Link>

        <Link href="/miniapps/tercera" className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700">
          📸 Agedres
        </Link>
      </div>
    </main>
  );
}
