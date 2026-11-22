/* Let’s Talk: custom contact form with Google Sheet capture and a mailto fallback. */
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const directEmail = "mailto:haripriyaatwork@gmail.com?subject=Portfolio%20enquiry";
const contactEndpoint = "https://script.google.com/macros/s/AKfycbw5WSRa67KJIfCGBtZwtjlB-lwnG9GPmK-GticNy1nfSahvTm-qdyTHFETgVFpc-L3B/exec";

const contactLinks = [
  { label: "EMAIL", value: "haripriyaatwork@gmail.com", href: "mailto:haripriyaatwork@gmail.com" },
  { label: "LINKEDIN", value: "Haripriya Mishra", href: "https://www.linkedin.com/in/haripriyamishra2301/" },
  { label: "SUBSTACK", value: "@haripriyamishra", href: "https://substack.com/@haripriyamishra?utm_source=user-menu" },
  { label: "INSTAGRAM", value: "@fromthepoetess", href: "https://www.instagram.com/fromthepoetess/" },
];

export default function Connect() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const subject = `Portfolio enquiry from ${name || "a visitor"}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    if (!contactEndpoint) {
      window.location.href = `${directEmail}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("fallback");
      return;
    }

    setStatus("sending");
    try {
      // text/plain avoids a CORS preflight for the Apps Script web app.
      await fetch(contactEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ name, email, message, source: window.location.href }),
      });
      formElement.reset();
      setStatus("sent");
    } catch {
      window.location.href = `${directEmail}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("fallback");
    }
  };

  return <section className="page container connect-page"><div className="page-intro"><span className="eyebrow">Let’s Talk</span><h1>LET’S<br /><em>TALK.</em></h1><p>For work. For ideas. For research. For writing. For something I haven’t thought of yet.</p></div><div className="connect-grid"><div className="connect-links"><span className="eyebrow">Find me where the links are</span><div className="contact-link-list">{contactLinks.map((link) => <a className="contact-link" href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"} key={link.label}><span className="project-number">{link.label}</span><strong>{link.value}</strong><ArrowUpRight size={15} /></a>)}</div></div><form className="connect-form" onSubmit={handleSubmit}><span className="eyebrow">Start a thread</span><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@example.com" /></label><label>What’s on your mind?<textarea name="message" required rows={5} placeholder="A brief, an idea, a question..." /></label><button className="button button-rose" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : status === "sent" ? "Sent to Haripriya" : "Send the signal"} <ArrowUpRight size={15} /></button><a className="direct-email-link" href={directEmail}>Or email directly: <strong>haripriyaatwork@gmail.com</strong> <ArrowUpRight size={14} /></a>{status === "sent" && <p className="form-success">Thanks — your message has been sent.</p>}{status === "fallback" && <p className="form-success">Your email app is ready with the message. If it did not open, use the direct email link above.</p>}</form></div></section>;
}
