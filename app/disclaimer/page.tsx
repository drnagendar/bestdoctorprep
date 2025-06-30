export default function DisclaimerPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Disclaimer</h1>

      <p className="mb-4">
        <strong>BestDoctorPrep</strong> is an independent educational platform created to help students prepare for medical exams through high-yield multiple choice questions and flashcards.
      </p>

      <p className="mb-4">
        This website is <strong>not affiliated with</strong>, endorsed by, or officially connected to any government agency, including the Indian Council of Medical Research (ICMR), NPTEL, or any university or medical board. All trademarks and names are the property of their respective owners.
      </p>

      <p className="mb-4">
        The content on this website, including MCQs, flashcards, and explanations, is originally authored by the BestDoctorPrep team or contributors based on publicly available knowledge. While every effort is made to ensure accuracy, the material provided is for educational purposes only and should not be considered official exam content.
      </p>

      <p className="mb-4">
        If any content unintentionally infringes upon copyrights or proprietary rights, please contact us at <strong>support@bestdoctorprep.in</strong> and we will promptly take corrective action.
      </p>

      <p className="mt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} BestDoctorPrep.in — All rights reserved.
      </p>
    </section>
  );
}
