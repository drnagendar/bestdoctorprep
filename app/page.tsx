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