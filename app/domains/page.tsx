import { prisma } from '@/lib/prisma'
import DomainsClient from './DomainsClient'

export const metadata = {
  title: 'Премиум домены - dodomain',
  description: 'Каталог премиум доменов для вашего бизнеса'
}

export default async function DomainsPage() {
  const domains = await prisma.domain.findMany({
    orderBy: { price: 'desc' }
  })

  return <DomainsClient initialDomains={domains} />
}
