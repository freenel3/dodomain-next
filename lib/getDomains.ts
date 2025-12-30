
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function getFilteredDomains(searchParams: { [key: string]: string | string[] | undefined }) {
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined
  const categories = typeof searchParams.categories === 'string' ? searchParams.categories.split(',') : undefined
  const extensions = typeof searchParams.extensions === 'string' ? searchParams.extensions.split(',') : undefined
  const query = typeof searchParams.q === 'string' ? searchParams.q : undefined

  const where: Prisma.DomainWhereInput = {
    isActive: true,
    AND: [
      minPrice !== undefined ? { price: { gte: minPrice } } : {},
      maxPrice !== undefined ? { price: { lte: maxPrice } } : {},
      categories ? { category: { in: categories } } : {},
      extensions ? { extension: { in: extensions } } : {},
      query ? { name: { contains: query, mode: 'insensitive' } } : {},
    ]
  }

  const domains = await prisma.domain.findMany({
    where,
    orderBy: { price: 'desc' },
  })

  return domains
}
