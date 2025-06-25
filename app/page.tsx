export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold">BestDoctorPrep</h1>
        <p className="text-sm mt-1">Smart Flashcards for MBBS, MD Students & Doctors</p>
      </header>

      {/* Main Content */}
      <section className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome to BestDoctorPrep</h2>
        <p className="mb-6 text-gray-600">
          Revise faster, retain longer, and boost your exam scores with our AI-powered medical flashcards.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Browse Flashcards
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-gray-500 py-4 mt-12 border-t">
        &copy; {new Date().getFullYear()} BestDoctorPrep.in — All rights reserved.
      </footer>
    </main>
  );
}