export type Product = {
  id: number
  name: string
  sku: string
  price: number
  is_active: boolean
  image_url: string | null
  created_at?: string
}

export type ProductFilters = {
  search: string
  status: 'all' | 'active' | 'inactive'
  sort: 'name' | 'price' | 'created_at'
  direction: 'asc' | 'desc'
}

export type ProductStats = {
  total: number
  active: number
  inactive: number
}

export type PaginationLink = {
  url: string | null
  label: string
  active: boolean
}

export type Paginated<T> = {
  data: T[]
  current_page: number
  last_page: number
  from: number | null
  to: number | null
  total: number
  links: PaginationLink[]
}
