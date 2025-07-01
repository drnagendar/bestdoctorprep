import { SUPPORT_EMAIL, SITE_NAME } from "../lib/constants";

export default function PrivacyPolicyPage() {
  return (
    <section className="max-w-3xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4 text-sm">
        At <strong>{SITE_NAME}</strong>, we are committed to protecting your personal information and your right to privacy. This Privacy Policy outlines how we collect, use, and protect your data when you use our platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 text-sm space-y-1">
        <li>Email address when registering or signing in</li>
        <li>Flashcard activity (e.g. reviewed status, favorites)</li>
        <li>User progress or interaction data (for spaced repetition optimization)</li>
        <li>Device and analytics data (via Firebase, Vercel, or Google Analytics)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 text-sm space-y-1">
        <li>To personalize and optimize your revision experience</li>
        <li>To analyze usage patterns and improve platform features</li>
        <li>To send relevant updates (only when you’ve opted in)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Data Sharing & Third Parties</h2>
      <p className="text-sm mb-4">
        We never sell or rent your personal data. However, we rely on third-party providers for secure hosting, analytics, and authentication services (e.g., Firebase, Vercel, Google) — all of which comply with their own privacy terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Your Rights & Choices</h2>
      <ul className="list-disc pl-6 text-sm space-y-1">
        <li>You may request deletion of your account and data at any time</li>
        <li>You may opt out of non-critical communications</li>
        <li>You can contact us directly for any concerns or inquiries</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Contact Us</h2>
      <p className="text-sm">
        For any privacy-related questions, concerns, or deletion requests, please email us at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 underline">
          {SUPPORT_EMAIL}
        </a>.
      </p>
    </section>
  );
}
