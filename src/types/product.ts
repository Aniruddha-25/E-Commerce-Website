export type Product = {
  id: string
  name: string
  preview: string
  photos: string[]
  description: string
  brand: string
  price: number
  isAccessory: boolean
}

export type ProductGroup = {
  clothing: Product[]
  accessories: Product[]
}

export type CartLine = {
  product: Product
  quantity: number
}
