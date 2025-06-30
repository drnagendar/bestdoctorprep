import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="text-center mt-12 px-4">
        <h2 className="text-3xl font-semibold mb-4">
          Welcome to <span className="text-blue-600">BestDoctorPrep</span>
        </h2>
        <p className="text-gray-700 text-lg mb-8">
          Revise faster, retain longer, and boost your exam scores with our AI-powered medical flashcards.
        </p>

        {/* Homepage-specific disclaimer */}
        <p className="mt-8 text-sm text-gray-600">
          <Link href="/disclaimer" className="hover:underline">
            Disclaimer: Not affiliated with ICMR or NPTEL
          </Link>
        </p>
      </section>

      {/* Global footer — consistently placed */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BestDoctorPrep.in — All rights reserved.
      </footer>
    </>
  );
}
