import type { Product, ProductGroup } from '../types/product'

const PRODUCT_API = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product'

function normalizeProduct(input: Product): Product {
  return {
    ...input,
    id: String(input.id),
    price: Number(input.price),
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCT_API)
  if (!response.ok) {
    throw new Error('Unable to load products')
  }

  const data = (await response.json()) as Product[]
  return data.map(normalizeProduct)
}

export async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(`${PRODUCT_API}/${id}`)
  if (!response.ok) {
    throw new Error('Unable to load product details')
  }

  const data = (await response.json()) as Product
  return normalizeProduct(data)
}

export function splitProductsByCategory(products: Product[]): ProductGroup {
  return products.reduce<ProductGroup>(
    (grouped, product) => {
      if (product.isAccessory) {
        grouped.accessories.push(product)
      } else {
        grouped.clothing.push(product)
      }

      return grouped
    },
    { clothing: [], accessories: [] },
  )
}
