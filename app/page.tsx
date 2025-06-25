export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-xl font-bold">BestDoctorPrep</div>
        <div className="space-x-6 hidden md:flex">
          <a href="#" className="hover:text-gray-200">Home</a>
          <a href="#" className="hover:text-gray-200">Flashcards</a>
          <a href="#" className="hover:text-gray-200">About</a>
          <a href="#" className="hover:text-gray-200">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">Welcome to BestDoctorPrep</h2>
        <p className="mb-6 text-gray-600 text-lg">
          Revise faster, retain longer, and boost your exam scores with our AI-powered medical flashcards.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Browse Flashcards
        </button>
      </section>

      {/* Subjects Section */}
      <section className="px-6 py-10 bg-gray-50">
        <h3 className="text-2xl font-bold text-center text-blue-700 mb-8">Explore by Subject</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            "Anatomy", "Physiology", "Biochemistry",
            "Pathology", "Pharmacology", "Microbiology",
            "Forensic Medicine", "Community Medicine"
          ].map((subject) => (
            <div
              key={subject}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg text-center cursor-pointer border border-gray-200 transition"
            >
              <p className="font-medium text-blue-700">{subject}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-gray-500 py-4 mt-12 border-t">
        &copy; {new Date().getFullYear()} BestDoctorPrep.in — All rights reserved.
      </footer>
    </main>
  );
}