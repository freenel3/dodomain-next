
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Delete existing data
  await prisma.contactRequest.deleteMany()
  await prisma.domain.deleteMany()
  await prisma.blogPost.deleteMany()

  // Domains
  const domains = [
    {
      name: 'crypto.com',
      price: 15000000,
      category: 'Premium',
      extension: '.com',
      description: 'The ultimate domain for the cryptocurrency industry.',
      registeredYear: '1993',
      traffic: '500K+ monthly',
      registrationDate: new Date('1993-05-15'),
      firstRegistrationDate: new Date('1993-05-15'),
      listedDate: new Date('2024-01-01'),
      isActive: true,
    },
    {
      name: 'wallet.eth',
      price: 500000,
      category: 'Web3',
      extension: '.eth',
      description: 'Short and memorable ENS name.',
      registeredYear: '2019',
      traffic: '10K+ monthly',
      registrationDate: new Date('2019-10-20'),
      firstRegistrationDate: new Date('2019-10-20'),
      listedDate: new Date('2024-02-15'),
      isActive: true,
    },
    {
      name: 'defi.io',
      price: 350000,
      category: 'DeFi',
      extension: '.io',
      description: 'Perfect for a Decentralized Finance platform.',
      registeredYear: '2018',
      traffic: '50K+ monthly',
      registrationDate: new Date('2018-03-12'),
      firstRegistrationDate: new Date('2018-03-12'),
      listedDate: new Date('2024-03-10'),
      isActive: true,
    },
    {
      name: 'exchange.app',
      price: 120000,
      category: 'App',
      extension: '.app',
      description: 'Ideal for a mobile trading application.',
      registeredYear: '2020',
      traffic: '5K+ monthly',
      registrationDate: new Date('2020-06-01'),
      firstRegistrationDate: new Date('2020-06-01'),
      listedDate: new Date('2024-01-20'),
      isActive: true,
    },
    {
      name: 'nft.art',
      price: 850000,
      category: 'NFT',
      extension: '.art',
      description: 'Premium domain for an NFT marketplace or gallery.',
      registeredYear: '2017',
      traffic: '100K+ monthly',
      registrationDate: new Date('2017-11-30'),
      firstRegistrationDate: new Date('2017-11-30'),
      listedDate: new Date('2024-02-05'),
      isActive: true,
    },
     {
      name: 'blockchain.net',
      price: 450000,
      category: 'Infrastructure',
      extension: '.net',
      description: 'Established domain for blockchain infrastructure services.',
      registeredYear: '2015',
      traffic: '20K+ monthly',
      registrationDate: new Date('2015-08-14'),
      firstRegistrationDate: new Date('2015-08-14'),
      listedDate: new Date('2024-01-15'),
      isActive: true,
    },
  ]

  for (const domain of domains) {
    await prisma.domain.create({
      data: domain,
    })
  }

  // Blog Posts
  const posts = [
    {
      slug: 'investing-in-premium-domains',
      title: 'Why Premium Domains are a Safe Bet in 2024',
      excerpt: 'Analyze the market trends and why digital real estate is booming.',
      content: `
        # Introduction
        Investing in premium domains is like buying real estate in the busiest part of town...
        
        ## Market Trends
         demand for short, memorable .com domains continues to rise.
         
        ## ROI Expectations
        Historically, premium domains have appreciated by...
      `,
      category: 'Investment',
      readTime: '5 min',
      publishedDate: new Date('2024-01-15'),
      isPublished: true,
    },
     {
      slug: 'web3-domain-guide',
      title: 'The Ultimate Guide to ENS and Web3 Domains',
      excerpt: 'Everything you need to know about .eth, .crypto, and decentralized identity.',
      content: `
        # What are Web3 Domains?
        Web3 domains turn complex wallet addresses into readable names...
        
        ## Benefits
        - Simplifies transactions
        - Censorship resistance
        - Identity ownership
      `,
      category: 'Web3',
      readTime: '8 min',
      publishedDate: new Date('2024-02-10'),
      isPublished: true,
    },
  ]

  for (const post of posts) {
    await prisma.blogPost.create({
      data: post,
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
