"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const services = [
  "Web Development",
  "GEO Optimisation",
  "SEO",
  "Paid Advertising",
  "Brand Identity",
  "Social Media Management",
  "Not Sure Yet",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Replace with your form submission endpoint (Resend, Formspree, etc.)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-brand-dark-2 border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-96">
        <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8192C" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-white text-2xl mb-2">
          Message Sent
        </h3>
        <p className="text-brand-gray">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-brand-dark-2 border border-white/5 rounded-2xl p-8">
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-brand-gray text-xs font-heading uppercase tracking-widest mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Smith"
            required
            className="w-full bg-brand-dark-3 border border-white/10 hover:border-white/20 focus:border-brand-red rounded-lg px-4 py-3 text-white placeholder-brand-gray text-sm outline-none transition-colors duration-200"
          />
        </div>

        {/* Email + Phone */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-brand-gray text-xs font-heading uppercase tracking-widest mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@company.com"
              required
              className="w-full bg-brand-dark-3 border border-white/10 hover:border-white/20 focus:border-brand-red rounded-lg px-4 py-3 text-white placeholder-brand-gray text-sm outline-none transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-brand-gray text-xs font-heading uppercase tracking-widest mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+44 7000 000000"
              className="w-full bg-brand-dark-3 border border-white/10 hover:border-white/20 focus:border-brand-red rounded-lg px-4 py-3 text-white placeholder-brand-gray text-sm outline-none transition-colors duration-200"
            />
          </div>
        </div>

        {/* Service */}
        <div>
          <label className="block text-brand-gray text-xs font-heading uppercase tracking-widest mb-2">
            Service Interested In
          </label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full bg-brand-dark-3 border border-white/10 hover:border-white/20 focus:border-brand-red rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors duration-200 appearance-none"
          >
            <option value="">Select a service...</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-brand-gray text-xs font-heading uppercase tracking-widest mb-2">
            Message *
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your project..."
            rows={5}
            required
            className="w-full bg-brand-dark-3 border border-white/10 hover:border-white/20 focus:border-brand-red rounded-lg px-4 py-3 text-white placeholder-brand-gray text-sm outline-none transition-colors duration-200 resize-none"
          />
        </div>

        {/* Error */}
        {status === "error" && (
          <p className="text-brand-red text-sm">
            Something went wrong. Please email us directly at hello@webspires.com.pk
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-heading font-bold py-4 rounded-lg transition-colors duration-200"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </div>
  );
}
