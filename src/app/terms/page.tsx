import { LegalPage } from "@/app/_components/legal-page";
import { termsSections } from "@/lib/legal-content";

export const dynamic = "force-dynamic";
export const metadata = { title: "Terms | Internship Tracker" };

export default function TermsPage() {
  return <LegalPage title="Terms of use" sections={termsSections} />;
}
