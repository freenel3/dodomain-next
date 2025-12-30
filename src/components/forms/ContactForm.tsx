"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FORM_VALIDATION } from "@/lib/constants";

// Схема валидации для контактной формы
const contactSchema = z.object({
  name: z
    .string()
    .min(
      FORM_VALIDATION.NAME_MIN_LENGTH,
      "Минимум {FORM_VALIDATION.NAME_MIN_LENGTH} символов"
    )
    .max(
      FORM_VALIDATION.NAME_MAX_LENGTH,
      "Максимум {FORM_VALIDATION.NAME_MAX_LENGTH} символов"
    ),
  email: z.string().min(1, "Email обязателен").email("Некорректный email"),
  subject: z
    .string()
    .min(1, "Тема обязателен")
    .max(500, "Максимум 500 символов"),
  message: z
    .string()
    .min(
      FORM_VALIDATION.MESSAGE_MIN_LENGTH,
      `Минимум ${FORM_VALIDATION.MESSAGE_MIN_LENGTH} символов`
    )
    .max(
      FORM_VALIDATION.MESSAGE_MAX_LENGTH,
      `Максимум ${FORM_VALIDATION.MESSAGE_MAX_LENGTH} символов`
    ),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
  domainName?: string;
}

/**
 * Форма контактов с валидацией
 * Client Component - требует useState для управления состоянием
 */
export default function ContactForm({
  onSuccess,
  domainName,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitError("");

    try {
      // TODO: Здесь будет Server Action для отправки формы
      // Имитация отправки для демо
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus("success");

      if (onSuccess) {
        onSuccess();
      }

      // Сбрасываем форму через 3 секунды
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setSubmitError("Произошла ошибка при отправке. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-xs font-medium text-black mb-1.5">
          Имя *
        </label>
        <input
          type="text"
          placeholder="Иван Петров"
          {...register("name", {
            className: `w-full px-3 py-2 bg-white border text-black text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`,
          })}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-xs text-red-600 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-medium text-black mb-1.5">
          Email *
        </label>
        <input
          type="email"
          placeholder="ivan@example.com"
          {...register("email", {
            className: `w-full px-3 py-2 bg-white border text-black text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`,
          })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-red-600 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label className="block text-xs font-medium text-black mb-1.5">
          Тема
        </label>
        <input
          type="text"
          placeholder="Вопрос о покупке домена"
          {...register("subject", {
            className: `w-full px-3 py-2 bg-white border text-black text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all ${
              errors.subject ? "border-red-500" : "border-gray-300"
            }`,
          })}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className="text-xs text-red-600 mt-1">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-medium text-black mb-1.5">
          Сообщение *
        </label>
        <textarea
          rows={4}
          placeholder="Расскажите нам, чем мы можем помочь..."
          {...register("message", {
            className: `w-full px-3 py-2 bg-white border text-black text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`,
          })}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-600 mt-1">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Domain Name (hidden) */}
      {domainName && (
        <input type="hidden" {...register("domainName")} value={domainName} />
      )}

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-green-600 text-sm mb-2">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Сообщение отправлено!</span>
          </div>
          <p className="text-sm text-gray-700">
            Мы свяжемся с вами в ближайшее время
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="text-center py-4">
          <div className="text-red-600 text-sm mb-2">
            Произошла ошибка при отправке. Попробуйте позже.
          </div>
          {submitError && (
            <p className="text-xs text-gray-600 mt-2">{submitError}</p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Отправка..." : "Отправить сообщение"}
      </button>
    </form>
  );
}
