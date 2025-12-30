"use server";

import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

/**
 * Схема валидации формы контактов
 */
const ContactFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа").max(100),
  email: z.string().email("Некорректный email"),
  message: z
    .string()
    .min(10, "Сообщение должно содержать минимум 10 символов")
    .max(2000),
  domainId: z.string().optional(),
  domainName: z.string().optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

/**
 * Server Action для отправки формы контактов
 */
export async function submitContactForm(formData: ContactFormData) {
  try {
    // Валидация данных
    const validatedData = ContactFormSchema.parse(formData);

    // Сохранение в базу данных
    await db.insert(contactSubmissions).values({
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      domainId: validatedData.domainId,
      domainName: validatedData.domainName,
      type: validatedData.domainId ? "offer" : "general",
      status: "new",
    });

    // Реалидация пути для обновления данных
    revalidatePath("/contact");
    if (validatedData.domainId) {
      revalidatePath(`/domains/${validatedData.domainId}`);
    }

    return {
      success: true,
      message:
        "Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.",
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Ошибка валидации данных",
        errors: error.errors,
      };
    }

    return {
      success: false,
      message:
        "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.",
    };
  }
}

/**
 * Server Action для отправки предложения по домену
 */
export async function submitDomainOffer(formData: {
  name: string;
  email: string;
  message: string;
  domainId: string;
  domainName: string;
  offerAmount?: number;
}) {
  try {
    // Валидация данных
    const validatedData = ContactFormSchema.parse({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      domainId: formData.domainId,
      domainName: formData.domainName,
    });

    // Сохранение в базу данных
    await db.insert(contactSubmissions).values({
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      domainId: validatedData.domainId,
      domainName: validatedData.domainName,
      type: "offer",
      status: "new",
    });

    // Реалидация пути
    revalidatePath(`/domains/${validatedData.domainId}`);

    return {
      success: true,
      message:
        "Предложение успешно отправлено! Мы рассмотрим его и свяжемся с вами.",
    };
  } catch (error) {
    console.error("Error submitting domain offer:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Ошибка валидации данных",
        errors: error.errors,
      };
    }

    return {
      success: false,
      message:
        "Произошла ошибка при отправке предложения. Пожалуйста, попробуйте позже.",
    };
  }
}
