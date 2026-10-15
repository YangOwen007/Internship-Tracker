import { LegalPage } from "@/app/_components/legal-page";
import { privacySections } from "@/lib/legal-content";

// Contact/provider disclosures are deployment settings, not build-time facts.
export const dynamic = "force-dynamic";
export const metadata = { title: "Privacy | Internship Tracker" };

export default function PrivacyPage() {
  return <LegalPage title="Privacy notice" sections={privacySections} privacy />;
}
