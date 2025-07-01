import { SITE_NAME, SUPPORT_EMAIL } from "../lib/constants";

export default function TermsPage() {
  return (
    <section className="max-w-3xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>

      <p className="text-sm mb-4">
        Welcome to <strong>{SITE_NAME}</strong>. By using this platform, you agree to the following terms and conditions. If you do not agree with these terms, please discontinue use of the service.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Educational Purpose</h2>
      <p className="text-sm mb-4">
        {SITE_NAME} is designed purely for educational and informational use by medical students and professionals. It is not a substitute for official curricula, coaching, or exam boards.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Account Usage</h2>
      <ul className="list-disc pl-6 text-sm space-y-1 mb-4">
        <li>You are responsible for any activity under your account</li>
        <li>You agree not to share login credentials or misuse any platform feature</li>
        <li>{SITE_NAME} reserves the right to suspend accounts for abuse or violation of these terms</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Intellectual Property</h2>
      <p className="text-sm mb-4">
        All flashcards, questions, visuals, and UI elements — unless explicitly credited — are original or AI-assisted creations intended for private study. Do not redistribute or scrape content without permission.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Limitation of Liability</h2>
      <p className="text-sm mb-4">
        While we strive for accuracy, {SITE_NAME} does not guarantee that all flashcards or questions are free from errors. Users should cross-reference critical medical information with authoritative sources.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Changes to These Terms</h2>
      <p className="text-sm mb-4">
        We may update these Terms of Use at any time. Continued use of the platform constitutes acceptance of any changes. Significant updates will be communicated to registered users.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Contact</h2>
      <p className="text-sm">
        For questions or concerns about these terms, please contact us at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 underline">
          {SUPPORT_EMAIL}
        </a>.
      </p>
    </section>
  );
}
