import Link from "next/link";

export default function HomePage() {
  return (
    <section className="text-center mt-12 px-4">
      <h2 className="text-3xl font-semibold mb-4">
        Welcome to <span className="text-blue-600">BestDoctorPrep</span>
      </h2>
      <p className="text-gray-700 text-lg mb-8">
        Revise faster, retain longer, and boost your exam scores with our AI-powered medical flashcards.
      </p>

      {/* Homepage-specific Disclaimer Footer */}
      <footer className="mt-12 text-sm text-gray-600">
        <p>
          <Link href="/disclaimer" className="hover:underline">
            Disclaimer: Not affiliated with ICMR or NPTEL
          </Link>
        </p>
      </footer>
    </section>
  );
}
