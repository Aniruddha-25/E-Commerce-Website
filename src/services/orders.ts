const ORDER_API = 'https://5d76bf96515d1a0014085cf9.mockapi.io/order'

type OrderPayload = {
  amount: number
  product: string[]
}

export async function submitOrder(payload: OrderPayload): Promise<void> {
  await fetch(ORDER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}
