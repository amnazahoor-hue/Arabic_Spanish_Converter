"use client";

import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject is required."),
  message: z.string().min(20, "Message must be at least 20 characters."),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !json.ok) {
      setServerError(json.error ?? "Could not send your message.");
      return;
    }
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-lg)] border border-success/30 bg-surface p-8 text-center"
      >
        <h2 className="type-h3-card text-success mb-2">Thank you for contacting us!</h2>
        <p className="type-body">
          We have received your message. We usually reply within 1–2 business days.
        </p>
        <Button type="button" variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-[var(--radius-lg)] border border-border bg-surface p-6 md:p-8"
      noValidate
    >
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Do not fill</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <label htmlFor="fullName" className="mb-2 block text-nav font-medium text-heading">
          Full name *
        </label>
        <input
          id="fullName"
          className="w-full rounded-[var(--radius)] border border-border bg-surface px-4 py-3 text-body focus-visible:ring-2 focus-visible:ring-primary"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="mt-1 type-small text-error">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-nav font-medium text-heading">
          Email *
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-[var(--radius)] border border-border bg-surface px-4 py-3 text-body focus-visible:ring-2 focus-visible:ring-primary"
          {...register("email")}
        />
        {errors.email && <p className="mt-1 type-small text-error">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-nav font-medium text-heading">
          Subject *
        </label>
        <input
          id="subject"
          className="w-full rounded-[var(--radius)] border border-border bg-surface px-4 py-3 text-body focus-visible:ring-2 focus-visible:ring-primary"
          {...register("subject")}
        />
        {errors.subject && <p className="mt-1 type-small text-error">{errors.subject.message}</p>}
      </div>

      <TextArea
        label="Message *"
        rows={6}
        error={errors.message?.message}
        {...register("message")}
      />

      {serverError && (
        <p role="alert" className="type-small text-error">
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
