"use client";

import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(2, "Introduzca su nombre completo."),
  email: z.string().email("Introduzca una dirección de correo válida."),
  subject: z.string().min(3, "El asunto es obligatorio."),
  message: z.string().min(20, "El mensaje debe tener al menos 20 caracteres."),
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
      setServerError(json.error ?? "No se pudo enviar su mensaje.");
      return;
    }
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-lg)] border border-success/30 bg-section-primary-mist p-8 text-center"
      >
        <h2 className="type-h3-card text-success mb-2">¡Gracias por contactarnos!</h2>
        <p className="type-body">
          Hemos recibido su mensaje. Solemos responder en un plazo de 1–2 días laborables.
        </p>
        <Button type="button" variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-[var(--radius-lg)] border border-border/80 bg-section-primary-mist/40 p-6 md:p-8"
      noValidate
    >
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">No rellenar</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <label htmlFor="fullName" className="mb-2 block text-nav font-medium text-heading">
          Nombre completo *
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
          Correo electrónico *
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
          Asunto *
        </label>
        <input
          id="subject"
          className="w-full rounded-[var(--radius)] border border-border bg-surface px-4 py-3 text-body focus-visible:ring-2 focus-visible:ring-primary"
          {...register("subject")}
        />
        {errors.subject && <p className="mt-1 type-small text-error">{errors.subject.message}</p>}
      </div>

      <TextArea
        label="Mensaje *"
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
        {isSubmitting ? "Enviando…" : "Enviar mensaje"}
      </Button>
    </form>
  );
}
