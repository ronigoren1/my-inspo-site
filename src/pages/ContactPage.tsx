// The Contact page with a message form.
// Messages are delivered to your email (site.email) by FormSubmit (formsubmit.co, free).
// The very first message sends you a one-time "Activate form" email - click it once.
import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { usePageTitle } from "@/usePageTitle";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 font-serif text-xl outline-none transition-colors placeholder:text-soft/70 focus:border-cherry";

export function ContactPage() {
  usePageTitle("Contact");
  const [status, setStatus] = useState<Status>("idle");

  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return; // a robot filled the hidden field
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `New message from your website - ${data.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="grid gap-16 px-5 pb-10 pt-16 md:grid-cols-12 md:gap-6 md:px-10 md:pt-28">
      <div className="md:col-span-5">
        <p className="caps reveal text-soft">Contact</p>
        <h1 className="reveal mt-6 text-[clamp(3rem,7vw,7rem)] leading-[0.95]">Write to me</h1>
        <p className="reveal mt-8 max-w-md italic-serif text-2xl leading-snug text-soft">{site.contactIntro}</p>

        <p className="caps mt-16 text-soft">Email</p>
        <a href={`mailto:${site.email}`} className="mt-3 block break-all font-display text-2xl hover:italic hover:text-cherry md:text-3xl">
          {site.email}
        </a>
        <p className="caps mt-10 text-soft">Instagram</p>
        {site.instagram.map((ig) => (
          <a key={ig.url} href={ig.url} target="_blank" rel="noreferrer" className="mt-3 block italic-serif text-3xl hover:text-cherry">
            {ig.handle}
          </a>
        ))}
      </div>

      <div className="md:col-span-6 md:col-start-7">
        {status === "sent" ? (
          <div className="reveal flex h-full flex-col justify-center border-t border-ink pt-10">
            <p className="font-display text-5xl italic text-cherry md:text-6xl">Thank you.</p>
            <p className="mt-6 italic-serif text-2xl text-soft">Your message is on its way - I'll write back soon.</p>
            <button type="button" onClick={() => setStatus("idle")} className="link-line mt-10 self-start">Send another</button>
          </div>
        ) : (
          <form onSubmit={send} className="space-y-10 border-t border-ink pt-10">
            <label className="block">
              <span className="caps text-soft">Your name</span>
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <label className="block">
              <span className="caps text-soft">Your email</span>
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>
            <label className="block">
              <span className="caps text-soft">Message</span>
              <textarea name="message" required rows={5} className={`${field} resize-none`} />
            </label>
            {/* hidden trap for spam robots */}
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={status === "sending"}
                className="caps bg-cherry px-10 py-5 text-paper transition-colors hover:bg-ink disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              {status === "error" && (
                <p className="italic-serif text-xl text-cherry">
                  Something went wrong - please email me directly at {site.email}.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
