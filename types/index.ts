// Domain types
export interface Domain {
  id: number
  name: string
  price: number
  category: string
  extension: string
  description: string | null
  registeredYear: string | null
  traffic: string | null
  registrationDate: Date | null
  firstRegistrationDate: Date | null
  listedDate: Date | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Blog Post types
export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  readTime: string
  publishedDate: Date
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

// Contact form types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message?: string
  domainName: string
  type: 'buy' | 'offer'
}

export interface ContactFormResponse {
  success: boolean
  message?: string
  error?: string
  details?: Array<{
    field: string
    message: string
  }>
}

// API Response types
export interface APIError {
  error: string
  details?: unknown
}
