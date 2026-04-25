const CART_KEY = 'shoplane-cart'

type CartData = {
  ids: string[]
}

function safeJsonParse(value: string | null): CartData | null {
  if (!value) {
    return null
  }

  try {
    const parsed = JSON.parse(value) as CartData
    if (Array.isArray(parsed.ids) && parsed.ids.every((item) => typeof item === 'string')) {
      return parsed
    }
  } catch {
    return null
  }

  return null
}

function parseLegacyCookieValue(): string[] {
  const orderMatch = document.cookie.match(/(?:^|;\s*)orderId=([^,;]*)/)
  if (!orderMatch) {
    return []
  }

  const decoded = decodeURIComponent(orderMatch[1]).trim()
  if (!decoded || decoded === '0') {
    return []
  }

  return decoded
    .split(' ')
    .map((id) => id.trim())
    .filter(Boolean)
}

export function readCartIds(): string[] {
  const fromStorage = safeJsonParse(localStorage.getItem(CART_KEY))
  if (fromStorage) {
    return fromStorage.ids
  }

  const legacyIds = parseLegacyCookieValue()
  if (legacyIds.length) {
    writeCartIds(legacyIds)
  }

  return legacyIds
}

export function writeCartIds(ids: string[]): void {
  const payload: CartData = { ids }
  localStorage.setItem(CART_KEY, JSON.stringify(payload))
}

export function addToCartIds(ids: string[], productId: string): string[] {
  return [...ids, productId]
}

export function clearCartStorage(): void {
  writeCartIds([])
}

export function groupCartIds(ids: string[]): Record<string, number> {
  return ids.reduce<Record<string, number>>((grouped, id) => {
    grouped[id] = (grouped[id] ?? 0) + 1
    return grouped
  }, {})
}
