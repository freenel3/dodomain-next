
import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с нами для консультации по покупке или продаже домена. Мы всегда на связи в Telegram и по email.',
};

export default function ContactPage() {
  return <ContactForm />;
}
