"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex items-center justify-center">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to the <span className="text-blue-500">Meme Universe</span> 🚀
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed">
          Save, browse, and edit your favorite memes. Use the table to manage them or explore the meme gallery in a card layout.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/table"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300"
          >
            Meme Table
          </Link>

          <Link
            href="/list"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300"
          >
            Meme Gallery
          </Link>
        </div>
      </div>
    </main>
  );
}
