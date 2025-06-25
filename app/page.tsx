<h1>Hello from BestDoctorPrep!</h1>export default function Home() {
return (

{/* Header */}

BestDoctorPrep

Home
Flashcards
About
Contact


  {/* Hero Section */}
  <section className="flex-1 bg-blue-50 py-20 px-8 text-center">
    <h2 className="text-4xl font-extrabold text-blue-800 mb-4">Master Medicine with Flashcards</h2>
    <p className="text-lg text-gray-700 mb-8">Focused, exam-oriented flashcards for MBBS, MD students, and doctors.</p>
    <a href="#" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg shadow hover:bg-blue-700 transition">Start Learning</a>
  </section>

  {/* Features */}
  <section className="bg-white py-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    <div className="shadow-lg p-6 rounded-2xl border">
      <h3 className="text-xl font-semibold text-blue-700 mb-2">🔍 Topic-wise Coverage</h3>
      <p className="text-gray-600">Organized content for easy navigation and better retention.</p>
    </div>
    <div className="shadow-lg p-6 rounded-2xl border">
      <h3 className="text-xl font-semibold text-blue-700 mb-2">🧠 Spaced Repetition</h3>
      <p className="text-gray-600">Boost long-term memory with smart flashcard algorithms.</p>
    </div>
    <div className="shadow-lg p-6 rounded-2xl border">
      <h3 className="text-xl font-semibold text-blue-700 mb-2">📱 Mobile Friendly</h3>
      <p className="text-gray-600">Use it anywhere, anytime, on any device.</p>
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-gray-100 text-center py-6 text-sm text-gray-600">
    © {new Date().getFullYear()} BestDoctorPrep. All rights reserved.
  </footer>
</div>

);
}
