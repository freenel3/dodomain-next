
import { Metadata } from 'next';
import SellDomainForm from '@/components/sell-domain/SellDomainForm';

export const metadata: Metadata = {
  title: 'Продать домен быстро | Оценка за 24 часа',
  description: 'Выкупаем премиум домены напрямую. Получите оценку стоимости вашего домена за 24 часа. Быстрая сделка, безопасный платеж.',
};

export default function SellDomainPage() {
  return <SellDomainForm />;
}
