import Link from "next/link";
import { getLegalConfiguration } from "@/lib/legal-config";
import { policyUpdated, type PolicySection } from "@/lib/legal-content";

export function LegalPage({ title, sections, privacy = false }: {
  title: string;
  sections: PolicySection[];
  privacy?: boolean;
}) {
  const configuration = getLegalConfiguration();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
      <article className="panel rounded-[2rem] p-6 sm:p-10">
        <Link href="/" className="text-sm font-medium underline underline-offset-4">Back to Internship Tracker</Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">Last updated: {policyUpdated}</p>
        {!configuration.ready ? (
          <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            Deployment disclosures are not yet complete. Public account creation is
            unavailable until the operator configures contact, hosting, retention,
            and transfer information. Use synthetic data when evaluating this local project.
          </p>
        ) : null}
        {sections.map((section) => (
          <section key={section.title} className="mt-8">
            <h2 className="text-xl font-semibold text-slate-950">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-7 text-slate-700">{paragraph}</p>
            ))}
          </section>
        ))}
        {privacy ? (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-slate-950">Deployment disclosures</h2>
            <dl className="mt-3 grid gap-4 text-sm leading-7 text-slate-700">
              {[
                ["Hosting and database", configuration.hosting],
                ["Provider logs and backup retention", configuration.retention],
                ["International transfers and lawful bases", configuration.transfers],
              ].map(([label, value]) => (
                <div key={label}><dt className="font-semibold">{label}</dt><dd>{value || "Not configured. Must be finalized before public registrations."}</dd></div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Email provider: <a href="https://resend.com/legal/privacy-policy" className="underline">Resend</a>;
              see its <a href="https://resend.com/legal/subprocessors" className="underline">subprocessor list</a>.
              Provider access and retention must be checked against the actual plan and settings.
            </p>
          </section>
        ) : null}
        <section className="mt-8 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-semibold text-slate-950">Contact</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            {configuration.contactEmail ? (
              <a href={`mailto:${configuration.contactEmail}`} className="underline">{configuration.contactEmail}</a>
            ) : "A private request email has not been configured. Do not publish personal data in a public issue."}
          </p>
        </section>
      </article>
    </main>
  );
}
